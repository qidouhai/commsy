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

// Verify parameters for this page
if (!empty($_GET['iid'])) {
   $current_item_id = $_GET['iid'];
} else {
   include_once('functions/error_functions.php');
   trigger_error('A user item id must be given.', E_USER_ERROR);
}

$item_manager = $environment->getItemManager();
$type = $item_manager->getItemType($_GET['iid']);
if ($type != CS_USER_TYPE) {
   include_once('classes/cs_errorbox_view.php');
   $errorbox = new cs_errorbox_view($environment, true);
   $errorbox->setText(getMessage('ERROR_ILLEGAL_IID'));
   $page->add($errorbox);
} else {

   //used to signal which "creator infos" of annotations are expanded...
   $creatorInfoStatus = array();
   if (!empty($_GET['creator_info_max'])) {
     $creatorInfoStatus = explode('-',$_GET['creator_info_max']);
   }

   // Load the shown user
   $user_manager = $environment->getUserManager();
   $user_item = $user_manager->getItem($current_item_id);
   $current_user = $environment->getCurrentUser();
   $current_module = $environment->getCurrentModule();

   if ( !isset($user_item) ) {
      include_once('functions/error_functions.php');trigger_error('Item '.$current_item_id.' does not exist!', E_USER_ERROR);
   } elseif ( $user_item->isDeleted() ) {
            include_once('classes/cs_errorbox_view.php');
      $errorbox = new cs_errorbox_view($environment, true);
      $errorbox->setText(getMessage('ITEM_NOT_AVAILABLE'));
      $page->add($errorbox);
   } elseif ( !$user_item->maySee($current_user) ) {
            include_once('classes/cs_errorbox_view.php');
      $errorbox = new cs_errorbox_view($environment, true);
      $errorbox->setText(getMessage('LOGIN_NOT_ALLOWED'));
      $page->add($errorbox);
   } elseif ( $current_user->isRoot()
              and !$environment->inServer()
              and isset($_GET['mode'])
              and $_GET['mode'] == 'take_over'
            ) {
      $history = $session->getValue('history');
      $cookie = $session->getValue('cookie');
      $javascript = $session->getValue('javascript');
      $session_id = $session->getSessionID();
      $session = new cs_session_item();
      $session->createSessionID($user_item->getUserID());
      $session->setValue('auth_source',$user_item->getAuthSource());
      $session->setValue('root_session_id',$session_id);
      if ( $cookie == '1' ) {
         $session->setValue('cookie',2);
      } elseif ( empty($cookie) ) {
         // do nothing, so CommSy will try to save cookie
      } else {
         $session->setValue('cookie',0);
      }
      if ($javascript == '1') {
         $session->setValue('javascript',1);
      } elseif ($javascript == '-1') {
         $session->setValue('javascript',-1);
      }

      // save portal id in session to be sure, that user didn't
      // switch between portals
      if ( $environment->inServer() ) {
         $session->setValue('commsy_id',$environment->getServerID());
      } else {
         $session->setValue('commsy_id',$environment->getCurrentPortalID());
      }
      redirect($environment->getCurrentContextID(),'home','index',array());

   } else {

      // Mark as read
      $reader_manager = $environment->getReaderManager();
      $reader = $reader_manager->getLatestReader($user_item->getItemID());
      if ( empty($reader) or $reader['read_date'] < $user_item->getModificationDate() ) {
         $reader_manager->markRead($user_item->getItemID(), 0);
      }
      //Set Noticed
      $noticed_manager = $environment->getNoticedManager();
      $noticed = $noticed_manager->getLatestNoticed($user_item->getItemID());
      if ( empty($noticed) or $noticed['read_date'] < $user_item->getModificationDate() ) {
         $noticed_manager->markNoticed($user_item->getItemID(),0);
      }

      // Create view
      $current_context = $environment->getCurrentContextItem();

      $params = array();
      $params['environment'] = $environment;
      $params['with_modifying_actions'] = $current_context->isOpen();
      $params['creator_info_status'] = $creatorInfoStatus;
      $detail_view = $class_factory->getClass(USER_DETAIL_VIEW,$params);
      unset($params);

      if (isset($display_mod) and $display_mod == 'admin') {
         $detail_view->setDisplayModToAdmin();
      }
      $detail_view->setItem($user_item);
      if ( $user_item->getItemID() == $current_user->getItemID()
           or ( isset($display_mod) and $display_mod == 'admin' and $current_user->isModerator() )
         ) {
         if (!$environment->inPrivateRoom()){
            $detail_view->setSubItem($user_item);
         }
      }

      // Set up browsing order
      if ( !isset($_GET['single'])
           and $session->issetValue('cid'.$environment->getCurrentContextID().'_'.$current_module.'_index_ids')) {
         $user_ids = $session->getValue('cid'.$environment->getCurrentContextID().'_'.$current_module.'_index_ids');
      } else {
         $user_ids = array();
      }
      $detail_view->setBrowseIDs($user_ids);
      if ( isset($_GET['pos']) ) {
         $detail_view->setPosition($_GET['pos']);
      }

      // Set up rubric connections and browsing
      $context_item = $environment->getCurrentContextItem();
      if ( $environment->getCurrentModule() != 'account'
           and ( $context_item->isProjectRoom()
                 or $context_item->isCommunityRoom()
               )
         ) {
         $current_room_modules = $context_item->getHomeConf();
         if ( !empty($current_room_modules) ){
            $room_modules = explode(',',$current_room_modules);
         } else {
            $room_modules = array();
         }
         $first = array();
         $second = array();
         foreach ( $room_modules as $module ) {
            $link_name = explode('_', $module);
            if ( $link_name[1] != 'none' and $link_name[0] != $_GET['mod'] and $link_name[0] != CS_USER_TYPE) {
               switch ($detail_view->_is_perspective($link_name[0])) {
                  case true:
                     $first[] = $link_name[0];
                  break;
                  case false:
                     $second[] = $link_name[0];
                  break;
               }
            }
         }
         $room_modules = $first;
         $rubric_connections = array();
         foreach ($room_modules as $module){
            if ($context_item->withRubric($module) ) {
               $ids = $user_item->getLinkedItemIDArray($module);
               $session->setValue('cid'.$environment->getCurrentContextID().'_'.$module.'_index_ids', $ids);
               if ($module != CS_TOPIC_TYPE and
                   $module != CS_INSTITUTION_TYPE and
                   $module != CS_GROUP_TYPE ){
                   $ids = $user_item->getModifiedItemIDArray($module,$user_item->getItemID());
                   $detail_view->addModifiedItemIDArray($module,$ids);
               }
               $rubric_connections[] = $module;
            }
         }

         $room_modules = $second;
         foreach ($room_modules as $module) {
            if ($context_item->withRubric($module) ) {
               if ( $environment->inPortal()) {
                  $ids = array();
                  if ($module == CS_PROJECT_TYPE) {
                     $room_list = $user_item->getRelatedProjectList();
                  } elseif ($module == CS_COMMUNITY_TYPE) {
                     $room_list = $user_item->getRelatedCommunityList();
                  }
                  if ($room_list->isNotEmpty()) {
                      $room_item = $room_list->getFirst();
                      while ($room_item) {
                         if ($room_item->isOpen()) {
                            $ids[] = $room_item->getItemID();
                         }
                         $room_item = $room_list->getNext();
                      }
                  }
               } else {
                  if ( $module == CS_GROUP_TYPE or $module == CS_INSTITUTION_TYPE or $module == CS_TOPIC_TYPE) {
                     $ids = $user_item->getLinkedItemIDArray($module);
                     $session->setValue('cid'.$environment->getCurrentContextID().'_'.$module.'_index_ids', $ids);
                  } else {
                     $ids = $user_item->getModifiedItemIDArray($module,$user_item->getItemID());
                  }
               }
               $detail_view->addModifiedItemIDArray($module,$ids);
            }
         }
         $detail_view->setRubricConnections($rubric_connections);
      }
      if ( $environment->inPortal() or $environment->inServer() ){
         $page->addForm($detail_view);
      }else{
         $page->add($detail_view);
      }
   }
}
?>