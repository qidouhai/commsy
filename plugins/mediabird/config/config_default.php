<?php

/**
 * Holds the configuration of Mediabird
 * Values are being overwritten by the config.php generated using the setup
 * @author fabian
 *
 */
class MediabirdConfig {

	//database connection info
	public static $database_hostname = "localhost";
	public static $database_username = "mediabird";
	public static $database_password = "mediabird";
	public static $database_name = "mediabird";
	public static $database_table_prefix = "mb_";

	//path to server directory
	public static $server_path = "server";

	//check that the php user has write access rights to the folder specified here
	public static $uploads_folder = "uploads/";

	//check that the php user has write access rights to the folder specified here
	public static $cache_folder = "cache/";

	//security salt to compute the password hash codes
	public static $security_salt = "mediabirdsalt";

	//address from which emails are being sent
	public static $no_reply_address = "noreply@yourdomain";
	//address to which Terms of Use violation reports are being sent
	public static $webmaster_address = "webmaster@yourdomain";
	//address to which Terms of Use violation reports are being sent (cc)
	public static $developer_address = "info@mediabird.net";

	//if the application is being accessed using different URLs, absolute URLs
	//generated by Internet Explorer should be removed
	public static $disable_absolute_link_correction = false;

	//optional provide the external URL Mediabird will be accessed from
	//example: http://youdomain:80/path/to/index.php
	public static $www_root = null;
	
	//for servers with little bandwidth, you should set this to true. it allows scripts and
	//css to be dumped in a file and to be sent afterwards rather than leaving
	//all of them in separate files
	public static $disable_debug = false; //if false use source files instead of release scripts and concatenated css
	public static $disable_mail = false; //if false mail features are enabled
	public static $disable_signup = false; //if false signup feature is enabled

	public static $table_names = array(
		'AccountLink'=>'account_links',
		'User'=>'users',
		'Topic'=>'topics',
		'Check'=>'checks',
		'CheckStatus'=>'check_statusses',
		'Card'=>'cards',
		'CardContent'=>'card_contents',
		'CardTag'=>'card_tags',
		'Tag'=>'tags',
		'TagColor'=>'tag_colors',
		'Marker'=>'markers',
		'Group'=>'groups', //for migration purposes
		'Membership'=>'memberships', //for migration purposes
		'Right'=>'rights',
		'Question'=>'relation_questions',
		'Link'=>'relation_links',
		'Answer'=>'relation_answers',
		'Star'=>'relation_stars',
		'Vote'=>'relation_votes',
		'Flashcard'=>'relation_flashcards',
		'Relation'=>'relations',
		'Upload'=>'uploads',
		'UploadAccess'=>'upload_access',
		'Session'=>'sessions'
	);
	
	/**
	 * Transforms a data class name into its corresponding table name
	 * @param string $key Data class name (e.g. 'User')
	 * @param bool $noprefix True to include table prefix
	 * @return string Table name
	 */
	public static function tableName($key,$noprefix=false) {
		$translated = $key;
		if(isset(self::$table_names[$key])) {
			$translated=self::$table_names[$key];
		}
		if(!$noprefix) {
			$translated=self::$database_table_prefix.$translated;
		}
		return $translated;
	}

	//default path to terms of use
	public static $terms_url = "terms.php";
	
	//proxy to use for server url loading
	public static $proxy_address = null;
	public static $proxy_port = 8080;

	//pdfinfo or pdftk setup if installed
	public static $magic_path = "convert";
	public static $pdfinfo_path = "pdfinfo";
	public static $pdftk_path = "pdftk";
	
	//cache limit in kilobytes
	public static $cache_size = 100000;
	
	//latex setup if installed
	public static $latex_path = "/usr/bin/latex";
	public static $convert_path = "/usr/bin/dvipng";
	
	public static $topicCountLimit = 50; //max num of topics per user
	public static $tagCountLimit = 6; //maximum num of tags per card 
	public static $markerCountLimit = 15; // maximum num of markers per user
	public static $resourceContentLimit = 500; //maximum number of questions, links, flashcards per user
	public static $uploadCountLimit = 1500; //max num of uploads per user
}

?>
