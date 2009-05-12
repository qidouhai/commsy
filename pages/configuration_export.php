<?PHP
// $Id$
//
// Release $Name$
//
// Copyright (c)2002-2003 Matthias Finck, Dirk Fust, Oliver Hankel, Iver Jackewitz, Michael Janneck,
// Martti Jeenicke, Detlev Krause, Irina L. Marinescu, Timo Nolte, Bernd Pape,
// Edouard Simon, Monique Strauss, José Manuel González Vázquez
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

set_time_limit(0);

// Get item to be edited
if ( !empty($_GET['iid']) ) {
   $current_iid = $_GET['iid'];
} elseif ( !empty($_POST['iid']) ) {
   $current_iid = $_POST['iid'];
} else {
   include_once('functions/error_functions.php');trigger_error('lost room id',E_USER_ERROR);
}

$manager = $environment->getRoomManager();
$item = $manager->getItem($current_iid);
$current_user = $environment->getCurrentUserItem();

// Check access rights
if ( !empty($current_iid) and !isset($item) ) {
   $params = array();
   $params['environment'] = $environment;
   $params['with_modifying_actions'] = true;
   $errorbox = $class_factory->getClass(ERRORBOX_VIEW,$params);
   unset($params);
   $errorbox->setText(getMessage('ITEM_DOES_NOT_EXIST', $current_iid));
   $page->add($errorbox);
} elseif ( !$environment->inPortal() or !$current_user->isModerator() ) {
   $params = array();
   $params['environment'] = $environment;
   $params['with_modifying_actions'] = true;
   $errorbox = $class_factory->getClass(ERRORBOX_VIEW,$params);
   unset($params);
   $errorbox->setText(getMessage('LOGIN_NOT_ALLOWED'));
   $page->add($errorbox);
}

// Access granted
else {

   // Find out what to do
   if ( isset($_POST['option']) ) {
      $command = $_POST['option'];
   } else {
      $command = '';
   }

   // Cancel editing
   if ( isOption($command, getMessage('COMMON_CANCEL_BUTTON')) ) {
      $params = array();
      $params['room_id'] = $current_iid;
      redirect($environment->getCurrentContextID(),'home', 'index', $params);
   }

   // Show form and/or save item
   else {

      // Initialize the form
      $form = $class_factory->getClass(CONFIGURATION_EXPORT_FORM,array('environment' => $environment));

      // Load form data from postvars
      if ( !empty($_POST) ) {
         $form->setFormPost($_POST);
      }

      // Load form data from database
      elseif ( isset($item) ) {
         $form->setItem($item);
      }

      else {
         include_once('functions/error_functions.php');trigger_error('configuration_export was called in an unknown manner', E_USER_ERROR);
      }

      $form->prepareForm();
      $form->loadValues();

      // Save item
      if ( !empty($command)
           and isOption($command, getMessage('PORTAL_EXPORT_ROOM_BUTTON'))
         ) {

         $correct = $form->check();
         if ( $correct ) {
            $filename = 'var/temp/xml_export_'.$_POST['iid'].'.xml';

            if ( file_exists($filename) ) {
               unlink($filename);
            }

            $xmlfile = fopen($filename, 'a');
            $xml  = '';
            $xml .= '<commsy_export>'.LF;
            $xml .= '<version>'.getCommSyVersion().'</version>'.LF;
            $xml .= '<data>'.LF;
            fputs($xmlfile, $xml);

            # commsy kernel
            $data_type_array   = array();
            $data_type_array[] = CS_USER_TYPE;
            $data_type_array[] = CS_ANNOUNCEMENT_TYPE;
            $data_type_array[] = CS_DATE_TYPE;
            $data_type_array[] = CS_DISCUSSION_TYPE;
            $data_type_array[] = CS_MATERIAL_TYPE;
            $data_type_array[] = CS_TODO_TYPE;
            $data_type_array[] = CS_DISCARTICLE_TYPE;
            $data_type_array[] = CS_LABEL_TYPE;
            $data_type_array[] = CS_FILE_TYPE;
            $data_type_array[] = CS_ANNOTATION_TYPE;
            $data_type_array[] = CS_SECTION_TYPE;
            $data_type_array[] = CS_ITEM_TYPE;
            $data_type_array[] = CS_LINKITEM_TYPE;
            $data_type_array[] = CS_LINK_TYPE;
            $data_type_array[] = CS_LINKITEMFILE_TYPE;
            $data_type_array[] = CS_TAG_TYPE;
            $data_type_array[] = CS_TAG2TAG_TYPE;

            # commsy kernel (TBD)
            #$data_type_array[] = CS_READER_TYPE;
            #$data_type_array[] = CS_NOTICED_TYPE;
            #$data_type_array[] = CS_HASH_TYPE;

            # extensions
            $data_type_array[] = CS_HOMEPAGE_TYPE;
            $data_type_array[] = CS_LINKHOMEPAGEHOMEPAGE_TYPE;

            foreach ($data_type_array as $type) {
               $manager = $environment->getManager($type);
               $manager->setContextLimit($_POST['iid']);
               $manager->setOutputLimitToXML();
               if ( $type == CS_DATE_TYPE ) {
                  $manager->setWithoutDateModeLimit();
               }
               $manager->select();
               fputs($xmlfile, $manager->get());
            }

            # entry in room table
            if ( $item->isProjectRoom() ) {
               $manager = $environment->getProjectManager();
            } elseif ( $item->isCommunityRoom() ) {
               $manager = $environment->getCommunityManager();
            } elseif ( $item->isPrivateRoom() ) {
               $manager = $environment->getPrivateRoomManager();
            }
            $manager->setContextLimit($environment->getCurrentPortalID());
            $manager->setOutputLimitToXML();
            $manager->setIDArrayLimit(array(0 => $item->getItemID()));
            $manager->select();
            fputs($xmlfile, $manager->get());

            $xml = '</data>'.LF;
            $xml .= '</commsy_export>'.LF;
            fputs($xmlfile, $xml);
            fclose($xmlfile);

            include_once('classes/external_classes/zip.php');
            //Location where export is saved
            $zipfile = 'var/temp/upload_export_'.$_POST['iid'].'.zip';
            if ( file_exists($zipfile) ) {
               unlink($zipfile);
            }

            //Location, that will be backuped
            $backuppath = 'var/'.$environment->getCurrentPortalID().'/'.$_POST['iid'].'';
            $zip=new ziparch();

            //Add Uploads to zip-file
            $zip->mkzip($backuppath,$zipfile);
            //Add XML-Export to zip-file
            $zip->mkzip($filename,$zipfile);
            unlink($filename);
            unset($zip);
            $params = array();
            $params['environment'] = $environment;
            $params['with_modifying_actions'] = true;
            $link = $class_factory->getClass(TEXT_VIEW,$params);
            unset($params);
            $link->setText('<a href="../'.$zipfile.'">Download</a> ('.getFilesize($zipfile).')');
            $page->addForm($link);
         }
      }

      // Display form
      else {
         $params = array();
         $params['environment'] = $environment;
         $params['with_modifying_actions'] = true;
         $form_view = $class_factory->getClass(FORM_VIEW,$params);
         unset($params);
         $form_view->setAction(curl($environment->getCurrentContextID(),$environment->getCurrentModule(),$environment->getCurrentFunction(),''));
         $form_view->setForm($form);
         $page->addForm($form_view);
      }
   }
}
?>