<?php
require_once('classes/controller/ajax/popup/cs_rubric_popup_controller.php');

class cs_popup_project_controller implements cs_rubric_popup_controller {
    private $_environment = null;
    private $_popup_controller = null;

    /**
     * constructor
     */
    public function __construct(cs_environment $environment, cs_ajax_popup_controller $popup_controller) {
        $this->_environment = $environment;
        $this->_popup_controller = $popup_controller;
    }

    public function initPopup($item, $data) {
		$current_context = $this->_environment->getCurrentContextItem();
		$current_portal = $this->_environment->getCurrentPortalItem();
		$current_user = $this->_environment->getCurrentUser();
		$translator = $this->_environment->getTranslationObject();
		
		if($item !== null) {
			$this->_popup_controller->assign('item', 'title', $item->getTitle());
			$this->_popup_controller->assign('item', 'description', $item->getDescription());
		}
		
		// assign template vars
		$this->assignTemplateVars();
    }

    public function save($form_data, $additional = array()) {
        $environment = $this->_environment;
        $current_user = $this->_environment->getCurrentUserItem();
        $current_context = $this->_environment->getCurrentContextItem();
        
        $current_iid = $form_data['iid'];
        
        $translator = $this->_environment->getTranslationObject();
        
        if($current_iid === 'NEW') {
        	$item = null;
        } else {
        	$project_manager = $this->_environment->getProjectManager();
        	$item = $project_manager->getItem($current_iid);
        }
        
        // TODO: check rights */
        /****************************/
        if ( $current_iid != 'NEW' and !isset($item) ) {
        
        } elseif ( !(($current_iid == 'NEW' and $current_user->isUser()) or
        		($current_iid != 'NEW' and isset($item) and
        				$item->mayEdit($current_user))) ) {
        
        	/****************************/
        
        	}else { //Acces granted
        		$this->cleanup_session($current_iid);
        	
        		// save item
        		if($this->_popup_controller->checkFormData()) {
        			$session = $this->_environment->getSessionItem();
        			$item_is_new = false;
        			// Create new item
        			if ( !isset($item) ) {
        				$item_manager = $environment->getProjectManager();
        				$item = $item_manager->getNewItem();
        				$current_user = $environment->getCurrentUserItem();
        				$item->setCreatorItem($current_user);
        				$item->setCreationDate(getCurrentDateTimeInMySQL());
        				$item->setContextID($environment->getCurrentPortalID());
        				$item->open();
        				$item->setRoomContext($current_context->getRoomContext());
        				$item_is_new = true;
        			}
        			
        			// Set modificator and modification date
        			$current_user = $environment->getCurrentUserItem();
        			$item->setModificatorItem($current_user);
        			
        			// Set attributes
        			if ( isset($form_data['title']) ) {
        				$item->setTitle($form_data['title']);
        			}
        			
        			if (isset($form_data["description"])) {
        				/*$description = array();
        				$description[mb_strtoupper($current_context->getLanguage(), 'UTF-8')] = $form_data["description"];
        				
        				$item->setDescriptionArray($description);*/
        				
        				$item->setDescription($this->_popup_controller->getUtils()->cleanCKEditor($form_data['description']));
        			}
        			
        			// assignment
        			$item->setCommunityListByID(array($this->_environment->getCurrentContextID()));
        			
        			// Save item
        			$item->save();
        			
        			// this will update the right box list
        			if($item_is_new){
        				if ($session->issetValue('cid'.$environment->getCurrentContextID().'_'.CS_PROJECT_TYPE.'_index_ids')){
        					$id_array =  array_reverse($session->getValue('cid'.$environment->getCurrentContextID().'_'.CS_PROJECT_TYPE.'_index_ids'));
        				} else {
        					$id_array =  array();
        				}
        			
        				$id_array[] = $item->getItemID();
        				$id_array = array_reverse($id_array);
        				$session->setValue('cid'.$environment->getCurrentContextID().'_'.CS_PROJECT_TYPE.'_index_ids',$id_array);
        			}
        			
        			// save session
        			$this->_environment->getSessionManager()->save($session);
        			
        			// Add modifier to all users who ever edited this item
        			$manager = $environment->getLinkModifierItemManager();
        			$manager->markEdited($item->getItemID());
        			
        			// set return
        			$this->_popup_controller->setSuccessfullItemIDReturn($item->getItemID());
        		}
        	}
    }

    public function isOption( $option, $string ) {
        return (strcmp( $option, $string ) == 0) || (strcmp( htmlentities($option, ENT_NOQUOTES, 'UTF-8'), $string ) == 0 || (strcmp( $option, htmlentities($string, ENT_NOQUOTES, 'UTF-8') )) == 0 );
    }

    private function assignTemplateVars() {
        $current_user = $this->_environment->getCurrentUserItem();
        $current_context = $this->_environment->getCurrentContextItem();

		
		
		$this->_popup_controller->assign("item", "languages", $this->_environment->getAvailableLanguageArray());
    }


    public function getFieldInformation($sub = '') {
		$return = array(
			'description'			=> array(
				array(	'name'		=> 'description',
						'type'		=> 'text',
						'mandatory' => false)
			),
			'description'			=> array(
				array(	'name'		=> 'title',
						'type'		=> 'text',
						'mandatory' => true)
			),
			'community_room_array'=> array(
				array(	'name'		=> 'community_room_array',
						'type'		=> 'check',
						'mandatory' => false)
			)


		);

		return $return[$sub];
    }

	public function cleanup_session($current_iid) {
		$environment = $this->_environment;
		$session = $this->_environment->getSessionItem();
		$session->unsetValue($current_iid.'_post_vars');
	}


}