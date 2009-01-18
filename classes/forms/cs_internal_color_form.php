<?PHP
// $Id$
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

$this->includeClass(RUBRIC_FORM);

/** class for commsy forms
 * this class implements an interface for the creation of forms in the commsy style
 */
class cs_internal_color_form extends cs_rubric_form {

  /**
   * string - containing the headline of the form
   */
  var $_headline = NULL;
  var $_array_or_color_arrays = array();

  /** constructor: cs_internal_color_form
    * the only available constructor
    *
    * @param object environment the environment object
    *
    * @author CommSy Development Group
    */
   function cs_internal_color_form($params) {
      $this->cs_rubric_form($params);
   }

   function setCurrentColor($color){
      $this->_current_color = $color;
   }

   function setCurrentRubric($rubric){
      $this->_current_rubric = $rubric;
   }

   function setColorArray($color_array){
      $this->_color_array = $color_array;
   }

   /** init data for form, INTERNAL
    * this methods init the data for the form, for example groups
    *
    * @author CommSy Development Group
    */
   function _initForm () {

      $temp_array = array();
      $temp_array['text']  = getMessage('COMMON_COLOR_DEFAULT');
      $temp_array['value'] = 'COMMON_COLOR_DEFAULT';
      $this->_array_info_text[] = $temp_array;

      $temp_array = array();
      $temp_array['text']  = '-----';
      $temp_array['value'] = '-1';
      $this->_array_info_text[] = $temp_array;

      $temp_array = array();
      $temp_array['text']  = getMessage('COMMON_COLOR_SCHEMA_1');
      $temp_array['value'] = 'COMMON_COLOR_SCHEMA_1';
      $array_info_text_temp[getMessage('COMMON_COLOR_SCHEMA_1')] = $temp_array;

      $temp_array = array();
      $temp_array['text']  = getMessage('COMMON_COLOR_SCHEMA_2');
      $temp_array['value'] = 'COMMON_COLOR_SCHEMA_2';
      $array_info_text_temp[getMessage('COMMON_COLOR_SCHEMA_2')] = $temp_array;

      $temp_array = array();
      $temp_array['text']  = getMessage('COMMON_COLOR_SCHEMA_3');
      $temp_array['value'] = 'COMMON_COLOR_SCHEMA_3';
      $array_info_text_temp[getMessage('COMMON_COLOR_SCHEMA_3')] = $temp_array;

      $temp_array = array();
      $temp_array['text']  = getMessage('COMMON_COLOR_SCHEMA_4');
      $temp_array['value'] = 'COMMON_COLOR_SCHEMA_4';
      $array_info_text_temp[getMessage('COMMON_COLOR_SCHEMA_4')] = $temp_array;

      $temp_array = array();
      $temp_array['text']  = getMessage('COMMON_COLOR_SCHEMA_5');
      $temp_array['value'] = 'COMMON_COLOR_SCHEMA_5';
      $array_info_text_temp[getMessage('COMMON_COLOR_SCHEMA_5')] = $temp_array;

      $temp_array = array();
      $temp_array['text']  = getMessage('COMMON_COLOR_SCHEMA_6');
      $temp_array['value'] = 'COMMON_COLOR_SCHEMA_6';
      $array_info_text_temp[getMessage('COMMON_COLOR_SCHEMA_6')] = $temp_array;

      $temp_array = array();
      $temp_array['text']  = getMessage('COMMON_COLOR_SCHEMA_7');
      $temp_array['value'] = 'COMMON_COLOR_SCHEMA_7';
      $array_info_text_temp[getMessage('COMMON_COLOR_SCHEMA_7')] = $temp_array;

      $temp_array = array();
      $temp_array['text']  = getMessage('COMMON_COLOR_SCHEMA_8');
       $temp_array['value'] = 'COMMON_COLOR_SCHEMA_8';
       $array_info_text_temp[getMessage('COMMON_COLOR_SCHEMA_8')] = $temp_array;

      $temp_array = array();
      $temp_array['text']  = getMessage('COMMON_COLOR_SCHEMA_9');
       $temp_array['value'] = 'COMMON_COLOR_SCHEMA_9';
       $array_info_text_temp[getMessage('COMMON_COLOR_SCHEMA_9')] = $temp_array;

      $temp_array = array();
      $temp_array['text']  = getMessage('COMMON_COLOR_SCHEMA_10');
      $temp_array['value'] = 'COMMON_COLOR_SCHEMA_10';
      $array_info_text_temp[getMessage('COMMON_COLOR_SCHEMA_10')] = $temp_array;

      $temp_array = array();
      $temp_array['text']  = getMessage('COMMON_COLOR_SCHEMA_11');
      $temp_array['value'] = 'COMMON_COLOR_SCHEMA_11';
      $array_info_text_temp[getMessage('COMMON_COLOR_SCHEMA_11')] = $temp_array;

      ksort($array_info_text_temp);
      foreach($array_info_text_temp as $entry){
         $this->_array_info_text[] = $entry;
      }
      $temp_array = array();
      $temp_array['text']  = '-----';
      $temp_array['value'] = '-1';
      $this->_array_info_text[] = $temp_array;

      $temp_array = array();
      $temp_array['text']  = getMessage('COMMON_COLOR_SCHEMA_OWN');
      $temp_array['value'] = 'COMMON_COLOR_SCHEMA_OWN';
      $this->_array_info_text[] = $temp_array;

   }

   /** create the form, INTERNAL
    * this methods creates the form with the form definitions
    *
    * @author CommSy Development Group
    */
   function _createForm () {
      $this->_form->addSelect( 'color_choice',
                               $this->_array_info_text,
                               '',
                               getMessage('CONFIGURATION_COLOR_FORM_CHOOSE_TEXT'),
                               '',
                               '',
                               '',
                               '',
                               true,
                               getMessage('COMMON_CHOOSE_BUTTON'),
                               'option',
         '',
         '',
         '15',
                               true);
      if ( !empty($this->_form_post['color_choice']) ) {
         if ( $this->_form_post['color_choice']== 'COMMON_COLOR_DEFAULT' ) {
            $desc = '<img src="images/color_schema_default.gif" alt="'.getMessage('COMMON_COLOR_DEFAULT').'" style=" border:1px solid black; vertical-align: middle;"/>';
            $this->_form->addText('example',getMessage('COMMON_COLOR_EXAMPLE'),$desc);
         }elseif ( $this->_form_post['color_choice']== 'COMMON_COLOR_SCHEMA_1' ) {
            $desc = '<img src="images/color_schema_1.gif" alt="'.getMessage('COMMON_COLOR_SCHEMA_1').'" style=" border:1px solid black; vertical-align: middle;"/>';
            $this->_form->addText('example',getMessage('COMMON_COLOR_EXAMPLE'),$desc);
         }elseif ( $this->_form_post['color_choice']=='COMMON_COLOR_SCHEMA_3' ) {
            $desc = '<img src="images/color_schema_3.gif" alt="'.getMessage('COMMON_COLOR_SCHEMA_3').'" style=" border:1px solid black; vertical-align: middle;"/>';
            $this->_form->addText('example',getMessage('COMMON_COLOR_EXAMPLE'),$desc);
         }elseif ( $this->_form_post['color_choice']=='COMMON_COLOR_SCHEMA_2' ) {
            $desc = '<img src="images/color_schema_2.gif" alt="'.getMessage('COMMON_COLOR_SCHEMA_2').'" style=" border:1px solid black; vertical-align: middle;"/>';
            $this->_form->addText('example',getMessage('COMMON_COLOR_EXAMPLE'),$desc);
         }elseif ( $this->_form_post['color_choice']=='COMMON_COLOR_SCHEMA_4' ) {
            $desc = '<img src="images/color_schema_4.gif" alt="'.getMessage('COMMON_COLOR_SCHEMA_4').'" style=" border:1px solid black; vertical-align: middle;"/>';
            $this->_form->addText('example',getMessage('COMMON_COLOR_EXAMPLE'),$desc);
         }elseif ( $this->_form_post['color_choice']=='COMMON_COLOR_SCHEMA_5' ) {
            $desc = '<img src="images/color_schema_5.gif" alt="'.getMessage('COMMON_COLOR_SCHEMA_5').'" style=" border:1px solid black; vertical-align: middle;"/>';
            $this->_form->addText('example',getMessage('COMMON_COLOR_EXAMPLE'),$desc);
         }elseif ( $this->_form_post['color_choice']=='COMMON_COLOR_SCHEMA_6' ) {
            $desc = '<img src="images/color_schema_6.gif" alt="'.getMessage('COMMON_COLOR_SCHEMA_6').'" style=" border:1px solid black; vertical-align: middle;"/>';
            $this->_form->addText('example',getMessage('COMMON_COLOR_EXAMPLE'),$desc);
         }elseif ( $this->_form_post['color_choice']=='COMMON_COLOR_SCHEMA_7' ) {
            $desc = '<img src="images/color_schema_7.gif" alt="'.getMessage('COMMON_COLOR_SCHEMA_7').'" style=" border:1px solid black; vertical-align: middle;"/>';
            $this->_form->addText('example',getMessage('COMMON_COLOR_EXAMPLE'),$desc);
         }elseif ( $this->_form_post['color_choice']=='COMMON_COLOR_SCHEMA_8' ) {
            $desc = '<img src="images/color_schema_8.gif" alt="'.getMessage('COMMON_COLOR_SCHEMA_8').'" style=" border:1px solid black; vertical-align: middle;"/>';
            $this->_form->addText('example',getMessage('COMMON_COLOR_EXAMPLE'),$desc);
         }elseif ( $this->_form_post['color_choice']=='COMMON_COLOR_SCHEMA_9' ) {
            $desc = '<img src="images/color_schema_9.gif" alt="'.getMessage('COMMON_COLOR_SCHEMA_9').'" style=" border:1px solid black; vertical-align: middle;"/>';
            $this->_form->addText('example',getMessage('COMMON_COLOR_EXAMPLE'),$desc);
         }elseif ( $this->_form_post['color_choice']=='COMMON_COLOR_SCHEMA_10' ) {
            $desc = '<img src="images/color_schema_10.gif" alt="'.getMessage('COMMON_COLOR_SCHEMA_10').'" style=" border:1px solid black; vertical-align: middle;"/>';
            $this->_form->addText('example',getMessage('COMMON_COLOR_EXAMPLE'),$desc);
         }elseif ( $this->_form_post['color_choice']=='COMMON_COLOR_SCHEMA_11' ) {
            $desc = '<img src="images/color_schema_11.gif" alt="'.getMessage('COMMON_COLOR_SCHEMA_11').'" style=" border:1px solid black; vertical-align: middle;"/>';
            $this->_form->addText('example',getMessage('COMMON_COLOR_EXAMPLE'),$desc);
         }elseif ( $this->_form_post['color_choice']=='COMMON_COLOR_SCHEMA_OWN' ) {
            $this->_form->addEmptyLine();
            $this->_form->addTextField('color_1','',getMessage('COMMON_COLOR_1'),'','',10);
            $this->_form->addTextField('color_2','',getMessage('COMMON_COLOR_2'),'','',10);
#            $this->_form->addTextField('color_3','',getMessage('COMMON_COLOR_4'),'','',10);
            $this->_form->addHidden('color_3','');
#            $this->_form->addTextField('color_4','',getMessage('COMMON_COLOR_4'),'','',10);
            $this->_form->addHidden('color_4','');
            $this->_form->addTextField('color_5','',getMessage('COMMON_COLOR_4'),'','',10);
            $this->_form->addEmptyLine();
            $this->_form->addTextField('color_9','',getMessage('COMMON_COLOR_9'),'','',10);
            $this->_form->addTextField('color_8','',getMessage('COMMON_COLOR_8'),'','',10);
            $this->_form->addTextField('color_6','',getMessage('COMMON_COLOR_6'),'','',10);
#            $this->_form->addTextField('color_7','',getMessage('COMMON_COLOR_4'),'','',10);
            $this->_form->addHidden('color_7','');
            $this->_form->addEmptyLine();

            $this->_form->addTextField('color_10','',getMessage('COMMON_COLOR_10'),'','',10);
            $this->_form->addTextField('color_11','',getMessage('COMMON_COLOR_11'),'','',10);
#            $this->_form->addTextField('color_12','',getMessage('COMMON_COLOR_4'),'','',10);
            $this->_form->addHidden('color_12','');
            $this->_form->addEmptyLine();
            $this->_form->addTextField('color_13','',getMessage('COMMON_COLOR_13'),'','',10);
            $this->_form->addTextField('color_14','',getMessage('COMMON_COLOR_14'),'','',10);
            $this->_form->addTextField('color_15','',getMessage('COMMON_COLOR_15'),'','',10);
            $this->_form->addTextField('color_16','',getMessage('COMMON_COLOR_16'),'','',10);
         }
      } else{
         $context_item = $this->_environment->getCurrentContextItem();
         $color = $context_item->getColorArray();
         if ( $color['schema']== 'DEFAULT' ) {
            $desc = '<img src="images/color_schema_default.gif" alt="'.getMessage('COMMON_COLOR_DEFAULT').'" style=" border:1px solid black; vertical-align: middle;"/>';
            $this->_form->addText('example',getMessage('COMMON_COLOR_EXAMPLE'),$desc);
         }elseif ($color['schema']== 'SCHEMA_1' ) {
            $desc = '<img src="images/color_schema_1.gif" alt="'.getMessage('COMMON_COLOR_SCHEMA_1').'" style=" border:1px solid black; vertical-align: middle;"/>';
            $this->_form->addText('example',getMessage('COMMON_COLOR_EXAMPLE'),$desc);
         }elseif ( $color['schema']=='SCHEMA_3' ) {
            $desc = '<img src="images/color_schema_3.gif" alt="'.getMessage('COMMON_COLOR_SCHEMA_3').'" style=" border:1px solid black; vertical-align: middle;"/>';
            $this->_form->addText('example',getMessage('COMMON_COLOR_EXAMPLE'),$desc);
         }elseif ( $color['schema']=='SCHEMA_2' ) {
            $desc = '<img src="images/color_schema_2.gif" alt="'.getMessage('COMMON_COLOR_SCHEMA_2').'" style=" border:1px solid black; vertical-align: middle;"/>';
            $this->_form->addText('example',getMessage('COMMON_COLOR_EXAMPLE'),$desc);
         }elseif ( $color['schema']=='SCHEMA_4' ) {
            $desc = '<img src="images/color_schema_4.gif" alt="'.getMessage('COMMON_COLOR_SCHEMA_4').'" style=" border:1px solid black; vertical-align: middle;"/>';
            $this->_form->addText('example',getMessage('COMMON_COLOR_EXAMPLE'),$desc);
         }elseif ( $color['schema']=='SCHEMA_5' ) {
            $desc = '<img src="images/color_schema_5.gif" alt="'.getMessage('COMMON_COLOR_SCHEMA_5').'" style=" border:1px solid black; vertical-align: middle;"/>';
            $this->_form->addText('example',getMessage('COMMON_COLOR_EXAMPLE'),$desc);
         }elseif ( $color['schema']=='SCHEMA_6' ) {
            $desc = '<img src="images/color_schema_6.gif" alt="'.getMessage('COMMON_COLOR_SCHEMA_6').'" style=" border:1px solid black; vertical-align: middle;"/>';
            $this->_form->addText('example',getMessage('COMMON_COLOR_EXAMPLE'),$desc);
         }elseif ( $color['schema']=='SCHEMA_7' ) {
            $desc = '<img src="images/color_schema_7.gif" alt="'.getMessage('COMMON_COLOR_SCHEMA_7').'" style=" border:1px solid black; vertical-align: middle;"/>';
            $this->_form->addText('example',getMessage('COMMON_COLOR_EXAMPLE'),$desc);
         }elseif ( $color['schema']=='SCHEMA_8' ) {
            $desc = '<img src="images/color_schema_8.gif" alt="'.getMessage('COMMON_COLOR_SCHEMA_8').'" style=" border:1px solid black; vertical-align: middle;"/>';
            $this->_form->addText('example',getMessage('COMMON_COLOR_EXAMPLE'),$desc);
         }elseif ( $color['schema']=='SCHEMA_9' ) {
            $desc = '<img src="images/color_schema_9.gif" alt="'.getMessage('COMMON_COLOR_SCHEMA_9').'" style=" border:1px solid black; vertical-align: middle;"/>';
            $this->_form->addText('example',getMessage('COMMON_COLOR_EXAMPLE'),$desc);
         }elseif ( $color['schema']=='SCHEMA_10' ) {
            $desc = '<img src="images/color_schema_10.gif" alt="'.getMessage('COMMON_COLOR_SCHEMA_10').'" style=" border:1px solid black; vertical-align: middle;"/>';
            $this->_form->addText('example',getMessage('COMMON_COLOR_EXAMPLE'),$desc);
         }elseif ( $color['schema']=='SCHEMA_11' ) {
            $desc = '<img src="images/color_schema_11.gif" alt="'.getMessage('COMMON_COLOR_SCHEMA_11').'" style=" border:1px solid black; vertical-align: middle;"/>';
            $this->_form->addText('example',getMessage('COMMON_COLOR_EXAMPLE'),$desc);
         }elseif ( $color['schema']=='SCHEMA_OWN' ) {
            $this->_form->addEmptyLine();
            $this->_form->addTextField('color_1','',getMessage('COMMON_COLOR_1'),'','',10);
            $this->_form->addTextField('color_2','',getMessage('COMMON_COLOR_2'),'','',10);
#            $this->_form->addTextField('color_3','',getMessage('COMMON_COLOR_4'),'','',10);
            $this->_form->addHidden('color_3','');
#            $this->_form->addTextField('color_4','',getMessage('COMMON_COLOR_4'),'','',10);
            $this->_form->addHidden('color_4','');
            $this->_form->addTextField('color_5','',getMessage('COMMON_COLOR_5'),'','',10);
            $this->_form->addEmptyLine();
            $this->_form->addTextField('color_9','',getMessage('COMMON_COLOR_9'),'','',10);
            $this->_form->addTextField('color_8','',getMessage('COMMON_COLOR_8'),'','',10);
            $this->_form->addTextField('color_6','',getMessage('COMMON_COLOR_6'),'','',10);
#            $this->_form->addTextField('color_7','',getMessage('COMMON_COLOR_4'),'','',10);
            $this->_form->addHidden('color_7','');
            $this->_form->addEmptyLine();

            $this->_form->addTextField('color_10','',getMessage('COMMON_COLOR_10'),'','',10);
            $this->_form->addTextField('color_11','',getMessage('COMMON_COLOR_11'),'','',10);
#            $this->_form->addTextField('color_12','',getMessage('COMMON_COLOR_4'),'','',10);
            $this->_form->addHidden('color_12','');
            $this->_form->addEmptyLine();
            $this->_form->addTextField('color_13','',getMessage('COMMON_COLOR_13'),'','',10);
            $this->_form->addTextField('color_14','',getMessage('COMMON_COLOR_14'),'','',10);
            $this->_form->addTextField('color_15','',getMessage('COMMON_COLOR_15'),'','',10);
            $this->_form->addTextField('color_16','',getMessage('COMMON_COLOR_16'),'','',10);
         }

      }

      // switch CommSy6 and CommSy7
      if ( $this->_environment->inProjectRoom()
           or $this->_environment->inCommunityRoom()
           or $this->_environment->inPrivateRoom()
           or $this->_environment->inPortal()
           or $this->_environment->inServer()
         ) {
         $value_array = array();
         $temp_array = array();
         $temp_array['text'] = 'CommSy6';
         $temp_array['value'] = '6';
         $value_array[] = $temp_array;
         unset($temp_array);
         $temp_array = array();
         $temp_array['text'] = 'CommSy7';
         $temp_array['value'] = '7';
         $value_array[] = $temp_array;
         unset($temp_array);
         $this->_form->addSelect('design',$value_array,'',$this->_translator->getMessage('CONFIGURATION_COLOR_DESIGN'),'');
         $this->_form->combine();
         $this->_form->addText('design_desc',getMessage('CONFIGURATION_DESIGN_SWITCH_DESC'),getMessage('CONFIGURATION_DESIGN_SWITCH_DESC'));
      }

      // buttons
      $this->_form->addButtonBar('option',getMessage('COMMON_SAVE_BUTTON'),'');

   }

   /** loads the selected and given values to the form
    * this methods loads the selected and given values to the form from the material item or the form_post data
    */
   function _prepareValues () {
      $context_item = $this->_environment->getCurrentContextItem();
      $color = $context_item->getColorArray();
      $this->_values = array();
      $temp_array = array();
      $temp_array['color_1'] = $color['tabs_background'];
      $temp_array['color_2'] = $color['tabs_focus'];
      $temp_array['color_3'] = $color['table_background'];
      $temp_array['color_4'] = $color['tabs_title'];
      $temp_array['color_5'] = $color['headline_text'];
      $temp_array['color_6'] = $color['hyperlink'];
      $temp_array['color_7'] = $color['help_background'];
      $temp_array['color_8'] = $color['boxes_background'];
      $temp_array['color_9'] = $color['content_background'];
      $temp_array['color_10'] = $color['list_entry_odd'];
      $temp_array['color_11'] = $color['list_entry_even'];
      $temp_array['color_12'] = $color['index_td_head_title'];
      $temp_array['color_13'] = $color['date_title'];
      $temp_array['color_14'] = $color['info_color'];
      $temp_array['color_15'] = $color['disabled'];
      $temp_array['color_16'] = $color['warning'];

      // switch CommSy6 / CommSy7
      if ( $context_item->isDesign6() ) {
         $this->_values['design'] = 6;
      } else {
         $this->_values['design'] = 7;
      }

      if ( !empty($this->_form_post) ) {
         $this->_values = $this->_form_post;
         if (empty($this->_values['color_choice'])){
            $this->_values['color_choice'] = 'COMMON_COLOR_'.strtoupper($color['schema']);
         }
         if ($this->_values['color_choice']=='COMMON_COLOR_SCHEMA_OWN'){
            for ($i=1; $i<17; $i++){
               if ( !empty($this->_form_post['color_'.$i]) ){
                  $this->_values['color_'.$i] = $this->_form_post['color_'.$i];
               }else{
                  $this->_values['color_'.$i] = $temp_array['color_'.$i];
               }
            }
         }
       } else {
         $this->_values['color_choice'] = 'COMMON_COLOR_'.strtoupper($color['schema']);
         if ($this->_values['color_choice']=='COMMON_COLOR_SCHEMA_OWN'){
            $this->_values['color_1'] = $color['tabs_background'];
            $this->_values['color_2'] = $color['tabs_focus'];
            $this->_values['color_3'] = $color['table_background'];
            $this->_values['color_4'] = $color['tabs_title'];
            $this->_values['color_5'] = $color['headline_text'];
            $this->_values['color_6'] = $color['hyperlink'];
            $this->_values['color_7'] = $color['help_background'];
            $this->_values['color_8'] = $color['boxes_background'];
            $this->_values['color_9'] = $color['content_background'];
            $this->_values['color_10'] = $color['list_entry_odd'];
            $this->_values['color_11'] = $color['list_entry_even'];
            $this->_values['color_12'] = $color['index_td_head_title'];
            $this->_values['color_13'] = $color['date_title'];
            $this->_values['color_14'] = $color['info_color'];
            $this->_values['color_15'] = $color['disabled'];
            $this->_values['color_16'] = $color['warning'];
         }
      }
   }
}
?>