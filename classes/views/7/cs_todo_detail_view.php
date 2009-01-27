<?PHP
//
// Release $Name$
//
// Copyright (c)2002-2003 Matthias Finck, Dirk Fust, Oliver Hankel, Iver Jackewitz, Michael Janneck,
// Martti Jeenicke, Detlev Krause, Irina L. Marinescu, Timo Nolte, Bernd Pape,
// Edouard Simon, Monique Strauss, Jos� Manuel Gonz�lez V�zquez
//
//    This file is part of CommSy.
//
//    CommSy is free software; you can redistribute it and/or modify
//    it under the terms of the GNU General Public License as published by
//    the Free Software Foundation; either version 2 of the License, or
//    (at your option) any later version.
//
//    CommSy is distributed in the hope that it will be useful,
//    but WITHOUT ANY WARRANTY; without even the implied warranty of
//    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
//    GNU General Public License for more details.
//
//    You have received a copy of the GNU General Public License
//    along with CommSy.

$this->includeClass(DETAIL_VIEW);
include_once('functions/curl_functions.php');

/**
 *  class for CommSy todo detail-views
 */
class cs_todo_detail_view extends cs_detail_view {

 /** array of ids in clipboard*/
   var $_clipboard_id_array=array();


   /** constructor
    * the only available constructor, initial values for internal variables
    *
    * @param object  environment            the CommSy environment
    * @param boolean with_modifying_actions true: display with modifying functions
    *                                       false: display without modifying functions
    *
    * @author CommSy Development Group
    */
   function cs_todo_detail_view ($params) {
      $this->cs_detail_view($params);
   }

   function setClipboardIDArray($cia) {
      $this->_clipboard_id_array = (array)$cia;
   }

   function _getClipboardIDArray() {
      return $this->_clipboard_id_array;
   }


   /** get the single entry of the list view as HTML
    * this method returns the single entry in HTML-Code
    *
    * @returns string $item as HMTL
    *
    * @param object item     the single list entry
    * @author CommSy Development Group
    */
   function _getItemAsHTML($item) {
      $html  = LF.'<!-- BEGIN OF TODO ITEM DETAIL -->'.LF;
      $user = $this->_environment->getCurrentUser();
      $context = $this->_environment->getCurrentContextItem();
      $formal_data = array();
      $original_date = $item->getDate();
      $date = getDateTimeInLang($original_date);
      $status = $item->getStatus();
      $actual_date = date("Y-m-d H:i:s");
      if ($status !=$this->_translator->getMessage('TODO_DONE') and $original_date < $actual_date){
         $date = '<span class="required">'.$date.'</span>';
      }

      // Members
      $member_html = '';
      $members = $item->getProcessorItemList();
      if ( $members->isEmpty() ) {
         $member_html .= '   '.$this->_translator->getMessage('TODO_NO_PROCESSOR').LF;
      } else {
         $member = $members->getFirst();
         $count = $members->getCount();
         $counter = 0;
         while ($member) {
            $counter++;
            if ( $member->isUser() ){
               $linktext = $member->getFullname();
               if ( $member->maySee($user) ) {
                  $params = array();
                  $params['iid'] = $member->getItemID();
                  $member_html .= ahref_curl($this->_environment->getCurrentContextID(),
                                'user',
                                'detail',
                                $params,
                                $linktext);
                  unset($params);
               } else {
                  $member_html .= '<span class="disabled">'.$linktext.'</span>'.LF;
               }
               if ( $counter != $count) {
                  $member_html .= ', ';
               }
            }
            $member = $members->getNext();
         }
      }

      $temp_array[0] = $this->_translator->getMessage('TODO_VALIDITY_DATE');
      $temp_array[1] = $date;
      $formal_data[] = $temp_array;
      $temp_array[0] = $this->_translator->getMessage('TODO_PROCESSORS');
      $temp_array[1] = $member_html;
      $formal_data[] = $temp_array;
      $temp_array[0] = $this->_translator->getMessage('TODO_STATUS');
      $temp_array[1] = $item->getStatus();
      $formal_data[] = $temp_array;

      // Files
      $files = $this->_getFilesForFormalData($item);
     if ( !empty($files) ) {
         $temp_array = array();
         $temp_array[] = $this->_translator->getMessage('MATERIAL_FILES');
         $temp_array[] = implode(BRLF, $files);
         $formal_data[] = $temp_array;
      }

      if ( !empty($formal_data) ) {
         $html .= $this->_getFormalDataAsHTML($formal_data);
         $html .= BRLF;
      }

      // Description
      $desc = $item->getDescription();
      if ( !empty($desc) ) {
         $desc = $this->_text_as_html_long($desc);
         $desc = $this->_show_images($desc,$item,true);
         $html .= $this->getScrollableContent($desc,$item,'',true).LF;
      }

      $html  .= '<!-- END OF TODO ITEM DETAIL -->'.LF.LF;
      return $html;
   }

   /** get all the actions for this detail view as HTML
    * this method returns the actions in HTML-Code. It checks the access rights!
    *
    * @return string navigation as HMTL
    *
    * @author CommSy Development Group
    */
   function _getDetailItemActionsAsHTML ($item) {
	   $current_context = $this->_environment->getCurrentContextItem();
      $current_user = $this->_environment->getCurrentUserItem();
      $mod = $this->_with_modifying_actions;
      $html  = '';

      $current_context = $this->_environment->getCurrentContextItem();
      $current_user = $this->_environment->getCurrentUserItem();
      $html  = '';
      if ( $item->mayEdit($current_user) and $this->_with_modifying_actions ) {
         $params = array();
         $params['iid'] = $item->getItemID();
         $image = '<img src="images/commsyicons/22x22/edit.png" style="vertical-align:bottom;" alt="'.getMessage('COMMON_EDIT_ITEM').'"/>';
         $html .= ahref_curl( $this->_environment->getCurrentContextID(),
                                          $this->_environment->getCurrentModule(),
                                          'edit',
                                          $params,
                                          $image,
                                          getMessage('COMMON_EDIT_ITEM')).LF;
         unset($params);
      } else {
         $image = '<img src="images/commsyicons/22x22/edit_grey.png" style="vertical-align:bottom;" alt="'.getMessage('COMMON_EDIT_ITEM').'"/>';
         $html .= '<a title="'.$this->_translator->getMessage('COMMON_NO_ACTION').' "class="disabled">'.$image.'</a>'.LF;
      }
      // Enter or leave the topic
      if ( $item->isProcessor($current_user) ) {
         if ($mod) {
            $params['iid'] = $item->getItemID();
            $params['todo_option'] = '2';
            $image = '<img src="images/commsyicons/22x22/group_leave.png" style="vertical-align:bottom;" alt="'.getMessage('TODO_LEAVE').'"/>';
            $html .= ahref_curl(  $this->_environment->getCurrentContextID(),
                                       'todo',
                                       'detail',
                                       $params,
                                       $image,
                                       $this->_translator->getMessage('TODO_LEAVE')).LF;
         } else {
            $image = '<img src="images/commsyicons/22x22/group_leave_grey.png" style="vertical-align:bottom;" alt="'.getMessage('COMMON_NO_ACTION').'"/>';
            $html .= '<a title="'.$this->_translator->getMessage('COMMON_NO_ACTION').' "class="disabled">'.$image.'</a>'.LF;
         }
      } else {
         if ($current_user->isUser() and $mod ) {
            $params['iid'] = $item->getItemID();
            $params['todo_option'] = '1';
            $image = '<img src="images/commsyicons/22x22/group_enter.png" style="vertical-align:bottom;" alt="'.getMessage('TODO_ENTER').'"/>';
            $html .= ahref_curl(  $this->_environment->getCurrentContextID(),
                                       'todo',
                                       'detail',
                                       $params,
                                       $image,
                                       $this->_translator->getMessage('TODO_ENTER')).LF;
         } else {
            $image = '<img src="images/commsyicons/22x22/group_enter_grey.png" style="vertical-align:bottom;" alt="'.getMessage('COMMON_NO_ACTION').'"/>';
            $html .= '<a title="'.$this->_translator->getMessage('COMMON_NO_ACTION').' "class="disabled">'.$image.'</a>'.LF;
         }
      }
      if ( $item->mayEdit($current_user)  and $this->_with_modifying_actions ) {
         $params = $this->_environment->getCurrentParameterArray();
         $params['action'] = 'delete';
         $image = '<img src="images/commsyicons/22x22/delete.png" style="vertical-align:bottom;" alt="'.getMessage('COMMON_DELETE_ITEM').'"/>';
         $html .= ahref_curl( $this->_environment->getCurrentContextID(),
                                     $this->_environment->getCurrentModule(),
                                     'detail',
                                     $params,
                                     $image,
                                     getMessage('COMMON_DELETE_ITEM')).LF;
         unset($params);
      } else {
         $image = '<img src="images/commsyicons/22x22/delete_grey.png" style="vertical-align:bottom;" alt="'.getMessage('COMMON_DELETE_ITEM').'"/>';
         $html .= '<a title="'.$this->_translator->getMessage('COMMON_NO_ACTION').' "class="disabled">'.$image.'</a>'.LF;
      }


      return $html.'&nbsp;&nbsp;&nbsp;';
   }

   function _getSubItemsAsHTML($item){
      $html  = '';
      $html .= '<!-- BEGIN OF SUB ITEM DETAIL VIEW -->'.LF.LF;
      $html .= '<div style="width:100%; margin-top:40px;">'.LF;
      $html .= '<table style="border-collapse:collapse; width:100%; margin:0px; padding:0px;">'.LF;
      $count = 0;
      $subitems = $this->getSubItemList();
      if ( isset($subitems) and !empty($subitems) ){
         $count=$subitems->getCount();
      }
      if ( isset($subitems) and !$subitems->isEmpty() ) {
         $current_item = $subitems->getFirst();
         $pos_number = 1;
         while ( $current_item ) {
            $discussion_type = $item->getDiscussionType();
            $html .='<tr class="detail_discussion_entries">'.LF;

               $image = $this->_getItemPicture($current_item->getModificatorItem());
               $html .= '<td rowspan="3" style="width:60px; vertical-align:top; padding:20px 5px 5px 5px;">'.$image.'</td>'.LF;
               $html .='<td style="width:71%; padding-top:5px; vertical-align:bottom;">'.LF;
               if ( $current_item->isA(CS_DISCARTICLE_TYPE) ) {
                  $html .= '<a id="anchor'.$pos_number.'" name="anchor'.$pos_number.'"></a>'.LF;
               }
               $html .='<div style="padding-top:10px;">'.LF;
               $html .= '<a id="anchor'.$current_item->getItemID().'" name="anchor'.$current_item->getItemID().'"></a>'.LF;
               $html .= '<h3 class="subitemtitle">'.$this->_getSubItemTitleAsHTML($current_item, $pos_number);
               $html .= '</h3>'.LF;
               $html .='</div>'.LF;
               $html .='</td>'.LF;
               if(!(isset($_GET['mode']) and $_GET['mode']=='print')){
                  $html .='<td style="width:27%; padding-top:5px; padding-left:0px; padding-right:3px; vertical-align:bottom; text-align:right;">'.LF;
                  $html .= $this->_getSubItemDetailActionsAsHTML($current_item);
                  $html .='</td>'.LF;
               }else{
                  $html .='<td style="width:27%; padding-top:5px; padding-left:0px; padding-right:3px; vertical-align:bottom; text-align:right;">'.LF;
                  $html .= '&nbsp';
                  $html .='</td>'.LF;
               }
               $html .='</tr>'.LF;
               $html .='<tr>'.LF;
               $html .='<td colspan="2" class="infoborder" style="padding-top:5px; vertical-align:top; ">'.LF;
               if(!(isset($_GET['mode']) and $_GET['mode']=='print')){
                  $html .='<div style="float:right; height:6px; font-size:2pt;">'.LF;
                  $html .= $this->_getBrowsingIconsAsHTML($current_item, $pos_number,$count);
                  $html .='</div>'.LF;
               }
               $html .= $this->_getSubItemAsHTML($current_item, $pos_number).LF;
               $html .='</td>'.LF;
               $html .='</tr>'.LF;
               if(!(isset($_GET['mode']) and $_GET['mode']=='print')){
                  $html .='<tr>'.LF;
                  $html .='<td style="padding-top:5px; padding-bottom:30px; vertical-align:top; ">'.LF;
                  $mode = 'short';
                  if (!$item->isA(CS_USER_TYPE)) {
                     $mode = 'short';
                     if (in_array($current_item->getItemId(),$this->_openCreatorInfo)) {
                        $mode = 'long';
                     }
                     $html .= $this->_getCreatorInformationAsHTML($current_item, 6,$mode).LF;
                  }
                  $html .='</td>'.LF;
                  $html .='</tr>'.LF;
               }else{
                  $html .='<tr>'.LF;
                  $html .='<td style="padding-top:5px; padding-bottom:40px; vertical-align:top; ">'.LF;
                  $html .='</td>'.LF;
                  $html .='</tr>'.LF;
               }
            // set reader
       $reader_manager = $this->_environment->getReaderManager();
             $reader = $reader_manager->getLatestReader($current_item->getItemID());
       if ( empty($reader) or $reader['read_date'] < $current_item->getModificationDate() ) {
          $reader_manager->markRead($current_item->getItemID(),0);
       }
       // set Noticed
       $noticed_manager = $this->_environment->getNoticedManager();
       $noticed = $noticed_manager->getLatestNoticed($current_item->getItemID());
       if ( empty($noticed) or $noticed['read_date'] < $current_item->getModificationDate() ) {
          $noticed_manager->markNoticed($current_item->getItemID(),0);
       }

            $current_item = $subitems->getNext();
            $pos_number++;
         } // end while
      }

      $html .= '</table>'.LF;
      $html .= '<!-- END OF SUB ITEM DETAIL VIEW -->'.LF.LF;
      return $html;
   }


   function _getSubItemAsHTML ($item, $anchor_number) {
      $retour  = '';
      $desc = $item->getDescription();
      if ( !empty($desc) ) {
         $desc = $this->_text_as_html_long($desc);
         $desc = $this->_show_images($desc,$item,true);
         $retour .= $this->getScrollableContent($desc,$item,'',true).LF;
      }
      $retour  = '<div style="margin-left: 3px;">'.$retour.'</div>'.LF;

      // Files
      $retour .= '<div style="clear:both;"></div>'.LF;
      $files = $this->_getFilesForFormalData($item);
      if ( !empty($files) ) {
         $temp_array = array();
         $temp_array[] = $this->_translator->getMessage('MATERIAL_FILES');
         $temp_array[] = implode(BRLF, $files);
         $formal_data[] = $temp_array;
      }

      if ( !empty($formal_data) ) {
         $retour .= $this->_getFormalDataAsHTML($formal_data);
      }
      return $retour;
   }

   function _getTodoFormAsHTML(){
        if(!(isset($_GET['mode']) and $_GET['mode'] == 'print')) {
         $html = '<!-- BEGIN OF STEP FORM VIEW -->'.LF.LF;
         $item = $this->getItem();
            $html .='</div>'.LF;
            $html .='</div>'.LF;
            $html .='<div class="sub_item_main" style="border-top: 1px solid #B0B0B0; margin-left:70px; margin-top:20px; padding-top:5px; background-color:white;">'.LF;
            $html .='<div style="width:100%;" >'.LF;
            $html .= '<a name="form"></a>'.LF;
            $html .= '<form style="padding:0px; margin:0px;" action="'.curl($this->_environment->getCurrentContextID(),'step', 'edit','').'" method="post" enctype="multipart/form-data" name="f">'.LF;
            $html .= '   <input type="hidden" name="iid" value=""/>'.LF;
            $html .= '   <input type="hidden" name="todo_id" value="'.$item->getItemID().'"/>'.LF;
            $html .= '<table style="width:100%; border-collapse:collapse; margin-bottom:0px; padding-bottom:0px;" summary="Layout">'.LF;
            $html .= '<tr>'.LF;
            $html .= '<td style="width:1%; padding-top:5px; vertical-align:middle;">'.LF;
            $count = 1;
            $subitems = $this->getSubItemList();
            if ( isset($subitems) and !empty($subitems) ){
               $count = $subitems->getCount();
               $count++;
            }
            $html .= '<h3 class="subitemtitle">'.$count.'.&nbsp;</h3>';
            $html .= '</td>'.LF;
            $html .= '<td style="width:99%; padding-top:5px; padding-bottom:5px; vertical-align:top; text-align:left;">'.LF;
            $html .= '<input name="subject" style="width:98%; font-size:14pt; font-weight:bold; font-family: Arial, Nimbus Sans L, sans-serif;" value="" maxlength="200" tabindex="8" type="text"/>';
            $html .= '</td>'.LF;
            $html .= '<td rowspan="3" style="width:28%; padding-top:5px; vertical-align:top; ">'.LF;
            $html .= '</td>'.LF;
            $html .= '</tr>'.LF;
            $html .= '</table>'.LF;
            $html .= '<div style=" margin:0px;padding:0px;">'.LF;
            $normal = '<textarea style="font-size:10pt; width:98%;" name="description" rows="10" tabindex="8"></textarea>';
            $text = '';
            global $c_html_textarea;
            $current_context = $this->_environment->getCurrentContextItem();
            $with_htmltextarea = $current_context->withHtmlTextArea();
            $html_status = $current_context->getHtmlTextAreaStatus();
            $current_browser = strtolower($this->_environment->getCurrentBrowser());
            $current_browser_version = $this->_environment->getCurrentBrowserVersion();
            if ( !isset($c_html_textarea)
                 or !$c_html_textarea
                 or !$with_htmltextarea
               ) {
               $html .= $normal;
               $title = '&nbsp;'.getMessage('COMMON_TEXT_FORMATING_HELP_FULL');
               $html .= '<div style="padding-top:5px;">';
               $text .= '<div class="bold" style="padding-bottom:5px;">'.getMessage('HELP_COMMON_FORMAT_TITLE').':</div>';
               $text .= getMessage('COMMON_TEXT_FORMATING_FORMAT_TEXT');
               $text .= '<div class="bold" style="padding-bottom:5px;">'.getMessage('COMMON_TEXT_INCLUDING_MEDIA').':</div>';
               $text .= getMessage('COMMON_TEXT_INCLUDING_MEDIA_TEXT');
               $html .='<img id="toggle'.$current_context->getItemID().'" src="images/more.gif"/>';
               $html .= $title;
               $html .= '<div id="creator_information'.$current_context->getItemID().'">'.LF;
               $html .= '<div style="padding:2px;">'.LF;
               $html .= '<div id="form_formatting_box" style="width:98%">'.LF;
               $html .= $text;
               $html .= '</div>'.LF;
               $html .= '</div>'.LF;
               $html .= '</div>'.LF;
               $html .= '</div>'.LF;
            } elseif ( ($current_browser != 'msie'
                    and $current_browser != 'firefox'
                    and $current_browser != 'netscape'
                    and $current_browser != 'mozilla'
                    and $current_browser != 'camino'
                    and $current_browser != 'opera'
                    and $current_browser != 'safari')
               ) {
               $html .= $normal;
               $title = '&nbsp;'.getMessage('COMMON_TEXT_FORMATING_HELP_FULL');
               $html .= '<div style="padding-top:5px;">';
               $text .= '<div class="bold" style="padding-bottom:5px;">'.getMessage('HELP_COMMON_FORMAT_TITLE').':</div>';
               $text .= getMessage('COMMON_TEXT_FORMATING_FORMAT_TEXT');
               $text .= '<div class="bold" style="padding-bottom:5px;">'.getMessage('COMMON_TEXT_INCLUDING_MEDIA').':</div>';
               $text .= getMessage('COMMON_TEXT_INCLUDING_MEDIA_TEXT');
               $html .='<img id="toggle'.$current_context->getItemID().'" src="images/more.gif"/>';
               $html .= $title;
               $html .= '<div id="creator_information'.$current_context->getItemID().'">'.LF;
               $html .= '<div style="padding:2px;">'.LF;
               $html .= '<div id="form_formatting_box" style="width:98%">'.LF;
               $html .= $text;
               $html .= '</div>'.LF;
               $html .= '</div>'.LF;
               $html .= '</div>'.LF;
               $html .= '</div>'.LF;
            } else {
               $session = $this->_environment->getSessionItem();
                if ($session->issetValue('javascript')) {
                  $javascript = $session->getValue('javascript');
                  if ($javascript == 1) {
                     include_once('classes/cs_html_textarea.php');
                     $html_area = new cs_html_textarea();
                     $html .= $html_area->getAsHTML( 'description',
                                              '',
                                              20,
                                              $html_status,
                                              '',
                                              '',
                                              false
                                            );
                     $title = '&nbsp;'.getMessage('COMMON_TEXT_FORMATING_HELP_SHORT');
                     $html .= '<div style="padding-top:0px;">';
                     $text .= '<div class="bold" style="padding-bottom:5px;">'.getMessage('COMMON_TEXT_INCLUDING_MEDIA').':</div>';
                     $text .= getMessage('COMMON_TEXT_INCLUDING_MEDIA_TEXT');
                     $html .='<img id="toggle'.$current_context->getItemID().'" src="images/more.gif"/>';
                     $html .= $title;
                     $html .= '<div id="creator_information'.$current_context->getItemID().'">'.LF;
                     $html .= '<div style="padding:2px;">'.LF;
                     $html .= '<div id="form_formatting_box" style="width:98%">'.LF;
                     $html .= $text;
                     $html .= '</div>'.LF;
                     $html .= '</div>'.LF;
                     $html .= '</div>'.LF;
                     $html .= '</div>'.BRLF;
                  } else {
                     $html .= $normal;
                     $title = '&nbsp;'.getMessage('COMMON_TEXT_FORMATING_HELP_FULL');
                     $html .= '<div style="padding-top:5px;">';
                     $text .= '<div class="bold" style="padding-bottom:5px;">'.getMessage('HELP_COMMON_FORMAT_TITLE').':</div>';
                     $text .= getMessage('COMMON_TEXT_FORMATING_FORMAT_TEXT');
                     $text .= '<div class="bold" style="padding-bottom:5px;">'.getMessage('COMMON_TEXT_INCLUDING_MEDIA').':</div>';
                     $text .= getMessage('COMMON_TEXT_INCLUDING_MEDIA_TEXT');
                     $html .='<img id="toggle'.$current_context->getItemID().'" src="images/more.gif"/>';
                     $html .= $title;
                     $html .= '<div id="creator_information'.$current_context->getItemID().'">'.LF;
                     $html .= '<div style="padding:2px;">'.LF;
                     $html .= '<div id="form_formatting_box" style="width:98%">'.LF;
                     $html .= $text;
                     $html .= '</div>'.LF;
                     $html .= '</div>'.LF;
                     $html .= '</div>'.LF;
                     $html .= '</div>'.LF;
                  }
               } else {
                  $html .= $normal;
                  $title = '&nbsp;'.getMessage('COMMON_TEXT_FORMATING_HELP_FULL');
                  $html .= '<div style="padding-top:5px;">';
                  $text .= '<div class="bold" style="padding-bottom:5px;">'.getMessage('HELP_COMMON_FORMAT_TITLE').':</div>';
                  $text .= getMessage('COMMON_TEXT_FORMATING_FORMAT_TEXT');
                  $text .= '<div class="bold" style="padding-bottom:5px;">'.getMessage('COMMON_TEXT_INCLUDING_MEDIA').':</div>';
                  $text .= getMessage('COMMON_TEXT_INCLUDING_MEDIA_TEXT');
                  $html .='<img id="toggle'.$current_context->getItemID().'" src="images/more.gif"/>';
                  $html .= $title;
                  $html .= '<div id="creator_information'.$current_context->getItemID().'">'.LF;
                  $html .= '<div style="padding:2px;">'.LF;
                  $html .= '<div id="form_formatting_box" style="width:98%">'.LF;
                  $html .= $text;
                  $html .= '</div>'.LF;
                  $html .= '</div>'.LF;
                  $html .= '</div>'.LF;
                  $html .= '</div>'.LF;
               }
            }
            $html .= '</div>';
            // files
            $html .= '<table style="width:100%; border-collapse:collapse;" summary="Layout">'.LF;
            $html .= '<tr>'.LF;
            $html .= '<td class="key" style="width:10%; padding-top:5px; vertical-align:top; ">'.LF;
            $html .= getMessage('MATERIAL_FILES').':';
            $html .= '</td>'.LF;
            $html .= '<td style="width:90%; padding-top:5px; padding-bottom:5px; vertical-align:top; text-align:left;">'.LF;
            $val = ini_get('upload_max_filesize');
            $val = trim($val);
            $last = $val[strlen($val)-1];
            switch($last) {
               case 'k':
               case 'K':
                  $val = $val * 1024;
                  break;
               case 'm':
               case 'M':
                  $val = $val * 1048576;
                  break;
            }
            $meg_val = round($val/1048576);
            $html .= '   <input type="hidden" name="MAX_FILE_SIZE" value="'.$val.'"/>'.LF;
            $html .= '   <input type="file" name="upload" size="12" tabindex="5"/>&nbsp;<input type="submit" name="option" value="'.$this->_translator->getMessage('MATERIAL_UPLOADFILE_BUTTON').'" tabindex="6" style="width:9.61538461538em; font-size:10pt;"/>'.LF;
            $html .= BRLF;
            #$px = '245';
            $px = '331';
            $browser = $this->_environment->getCurrentBrowser();
            if ($browser == 'MSIE') {
               $px = '351';
            } elseif ($browser == 'OPERA') {
               $px = '321';
            } elseif ($browser == 'KONQUEROR') {
               $px = '361';
            } elseif ($browser == 'SAFARI') {
               $px = '380';
            } elseif ($browser == 'FIREFOX') {
               $operation_system = $this->_environment->getCurrentOperatingSystem();
               if (strtoupper($operation_system) == 'LINUX') {
                  $px = '360';
               } elseif (strtoupper($operation_system) == 'MAC OS') {
                  $px = '352';
               }
            } elseif ($browser == 'MOZILLA') {
               $operation_system = $this->_environment->getCurrentOperatingSystem();
               if (strtoupper($operation_system) == 'MAC OS') {
                  $px = '336'; // camino
               }
            }
            $em = $px/13;
            $html .= '<input name="option" value="'.getMessage('MATERIAL_BUTTON_MULTI_UPLOAD_YES').'" tabindex="7" type="submit" style="width: '.$em.'em;"/>'.LF;
            $html .= BRLF;
            $html .= '<span class="multiupload_discussion_detail">'.getMessage('MATERIAL_MAX_FILE_SIZE',$meg_val).'</span>'.LF;
            $html .= '</td>'.LF;
            $html .= '</tr>'.LF;

            $html .= '<tr>'.LF;
            $html .= '<td class="key" style="padding-top:10px; vertical-align:top; ">'.LF;
            $html .= '&nbsp;';
            $html .= '</td>'.LF;
            $html .= '<td style="padding-top:10px; vertical-align:top; white-space:nowrap;">'.LF;
            $html .= '<input name="option" value="'.getMessage('STEP_CHANGE_BUTTON').'" tabindex="8" type="submit"/>';
            $current_user = $this->_environment->getCurrentUser();
            if ( $current_user->isAutoSaveOn() ) {
               $html .= '<span class="formcounter">'.LF;
               global $c_autosave_mode;
               if ( $c_autosave_mode == 1 ) {
                  $currTime = time();
                  global $c_autosave_limit;
                  $sessEnds = $currTime + ($c_autosave_limit * 60);
                  $sessEnds = date("H:i", $sessEnds);
                  $html .= '&nbsp;'.$this->_translator->getMessage('COMMON_SAVE_AT_TIME').' '.$sessEnds.LF;
               } elseif ( $c_autosave_mode == 2 ) {
                  $html .= '&nbsp;'.$this->_translator->getMessage('COMMON_SAVE_AT_TIME').' <input type="text" size="5" name="timerField" value="..." class="formcounterfield" />'.LF;
               }
               $html .= '</span>'.LF;
            }
            $html .= '</td>'.LF;
            $html .= '</tr>'.LF;
            $html .= '</table>'.BRLF;
            $html .= '</form>';

            $html .='<script type="text/javascript">initTextFormatingInformation("'.$current_context->getItemID().'",false)</script>';
            if ( $current_user->isAutoSaveOn() ) {
               $html .= '   <script type="text/javascript">'.LF;
               $html .= '      <!--'.LF;
               $html .= '         var breakCrit = "'.getMessage('STEP_CHANGE_BUTTON').'"'.';'.LF;
               $html .= '         startclock();'.LF;
               $html .= '      -->'.LF;
               $html .= '   </script>'.LF;
            }

            $html .= '<!-- END OF STEP FORM VIEW -->'.LF.LF;
         return $html;
        }
   }



}
?>