jQuery(document).ready(function() {
   jQuery("select[id='submit_form']").each(function(i) {
      jQuery(this).change(function () {
         jQuery(this).parents("form").map(function () {
            this.submit();
         });
      });
   });

   jQuery("input[id='submit_form'][type='checkbox']").each(function(i) {
      jQuery(this).change(function () {
         jQuery(this).parents("form").map(function () {
            this.submit();
         });
      });
   });

   jQuery("a[id='submit_form']").each(function(i) {
      jQuery(this).click(function () {
         jQuery(this).parents("form").map(function () {
            this.submit();
         });
      });
   });
});

function resetSearchText(id){
   jQuery('#' + id).val("");
}

function handleWidth_new(id,max_width,link_name){
   var div = jQuery('#' + id);
   var inner_div = jQuery('#' + 'inner_'+id);
   var width = inner_div.scrollWidth;
   var height = inner_div.scrollHeight;

   if (width > max_width){
      inner_div.style.width = max_width+'px';
      if (navigator.userAgent.indexOf("MSIE") != -1){
         inner_div.style.height = (height+50)+'px';
      }
   }
}

var xpPanel_slideActive = true;	// Slide down/up active?
var xpPanel_slideSpeed = 30;	// Speed of slide
var xpPanel_onlyOneExpandedPane = false;	// Only one pane expanded at a time ?
var commsy_pane;
var commsy_panel_index;
var savedActivePane = new Array();
var savedActiveSub = new Array();
var xpPanel_currentDirection = new Array();
var cookieNames = new Array();
var speedArray = new Array();
var currentlyExpandedPane = false;

function initTextFormatingInformation(item_id,is_shown){
   if (is_shown == false){
      jQuery('#creator_information'+item_id).hide();
   }else{
      jQuery('#toggle'+item_id).attr('src', jQuery('#toggle'+item_id).attr('src').replace('more','less'));
   }
   jQuery('#toggle'+item_id).click(function(){
      if(jQuery('#toggle'+item_id).attr('src').toLowerCase().indexOf('less') >= 0){
         jQuery('#creator_information'+item_id).slideUp(200);
         jQuery('#toggle'+item_id).attr('src', jQuery('#toggle'+item_id).attr('src').replace('less','more'));
      } else {
         jQuery('#creator_information'+item_id).slideDown(200);
         jQuery('#toggle'+item_id).attr('src', jQuery('#toggle'+item_id).attr('src').replace('more','less'));
      }
   });
   jQuery('#toggle'+item_id).mouseover(function(){
      jQuery('#toggle'+item_id).attr('src', jQuery('#toggle'+item_id).attr('src').replace('.gif','_over.gif'));
   });
   jQuery('#toggle'+item_id).mouseout(function(){
      jQuery('#toggle'+item_id).attr('src', jQuery('#toggle'+item_id).attr('src').replace('_over.gif','.gif'));
   });
}

function initCreatorInformations(item_id,is_shown){
   if (is_shown == false){
      jQuery('#creator_information'+item_id).hide();
   }else{
      jQuery('#toggle'+item_id).attr('src', jQuery('#toggle'+item_id).attr('src').replace('more','less'));
   }
   jQuery('#toggle'+item_id).click(function(){
      if(jQuery('#toggle'+item_id).attr('src').toLowerCase().indexOf('less') >= 0){
         jQuery('#creator_information'+item_id).slideUp(200);
         jQuery('#toggle'+item_id).attr('src', jQuery('#toggle'+item_id).attr('src').replace('less','more'));
      } else {
         jQuery('#creator_information'+item_id).slideDown(200);
         jQuery('#toggle'+item_id).attr('src', jQuery('#toggle'+item_id).attr('src').replace('more','less'));
      }
   });
   jQuery('#toggle'+item_id).mouseover(function(){
      jQuery('#toggle'+item_id).attr('src', jQuery('#toggle'+item_id).attr('src').replace('.gif','_over.gif'));
   });
   jQuery('#toggle'+item_id).mouseout(function(){
      jQuery('#toggle'+item_id).attr('src', jQuery('#toggle'+item_id).attr('src').replace('_over.gif','.gif'));
   });
}

function preInitCommSyPanels(panelTitles,panelDesc,panelDisplayed,cookieArray,sizeArray){
   jQuery(document).ready(function() {
      initCommSyPanels(panelTitles,panelDesc,panelDisplayed,cookieArray,sizeArray,Array(),null,null);
   });
}

function initCommSyPanels(panelTitles,panelDesc,panelDisplayed,cookieArray,sizeArray,modArray,contextID,modify){
   var divs = jQuery('#commsy_panels').find('div');
   commsy_panel_index=0;
   for(var no=0;no<sizeArray.length;no++){
      if (sizeArray[no] < 31) {
         speedArray[no]=xpPanel_slideSpeed;
      } else if (sizeArray[no] < 61) {
         speedArray[no]=xpPanel_slideSpeed*2;
      } else {
         speedArray[no]=sizeArray[no];
      }
   }
   for(var no=0;no<divs.length;no++){
      if(divs[no].className == 'commsy_panel'){
         var temp_div = jQuery(divs[no]);
         var outerContentDiv = jQuery('<div></div>');
         var contentDiv = temp_div.children('div:first');
         outerContentDiv.append(contentDiv);
         outerContentDiv.attr('id', 'paneContent' + commsy_panel_index);
         outerContentDiv.attr('class', 'panelContent');

         var topBar = jQuery('<div></div>');
         topBar.attr('id', 'topBar' + commsy_panel_index);
         topBar.onselectstart = cancelXpWidgetEvent;

         var info = jQuery('<div></div>');
         info.attr('id', 'info' + commsy_panel_index);
         info.css('float', 'left');

         var span = jQuery('<span></span>');
         span.attr('id', 'span' + commsy_panel_index);
         span.html(panelTitles[commsy_panel_index].replace(/&COMMSYDHTMLTAG&/g,'</'));
         span.css('line-height', '20px');
         span.css('vertical-align', 'bottom');
         info.append(span);

         var span2 = jQuery('<span></span>');
         span2.attr('id', 'spanKlick' + commsy_panel_index);
         if(panelDesc[commsy_panel_index] == ''){
            span2.html('&nbsp;');
         } else {
            span2.html(panelDesc[commsy_panel_index]);
         }
         span2.attr('class', 'small');
         span2.css('line-height', '20px');
         span2.css('vertical-align', 'bottom');
         info.append(span2);

         topBar.css('position', 'relative');
         topBar.append(info);

         var klick = jQuery('<div></div>');
         klick.attr('id', 'klick' + commsy_panel_index);
         klick.css('height', '100%');

         if((contentDiv.attr('id') == 'homeheader') && (modArray[commsy_panel_index] != 'user')){
            var newItem = jQuery('<span></span>');
            if(modify == 1){
               if(session_id){
                 if(modArray[commsy_panel_index] == 'room'){
                    if(is_community_room){
                       modArray[commsy_panel_index] = 'project';
                    }
                 }
                 if (navigator.userAgent.indexOf("MSIE 6.0") == -1){
                     newItem.html('<a href="commsy.php?cid=' + contextID + '&mod=' + modArray[commsy_panel_index] + '&fct=edit&iid=NEW&SID=' + session_id + '" title="' + new_action_message + '"><img src="images/commsyicons/16x16/new_home_big.png"/></a>');
                 } else {
                   newItem.html('<a href="commsy.php?cid=' + contextID + '&mod=' + modArray[commsy_panel_index] + '&fct=edit&iid=NEW&SID=' + session_id + '" title="' + new_action_message + '"><img src="images/commsyicons_msie6/16x16/new_home_big.gif"/></a>');
                 }
               } else {
                 if(modArray[commsy_panel_index] == 'room'){
                    if(is_community_room){
                        modArray[commsy_panel_index] = 'project';
                     }
                  }
                 if (navigator.userAgent.indexOf("MSIE 6.0") == -1){
                    newItem.html('<a href="commsy.php?cid=' + contextID + '&mod=' + modArray[commsy_panel_index] + '&fct=edit&iid=NEW" title="' + new_action_message + '"><img src="images/commsyicons/16x16/new_home_big.png"/></a>');
                 } else {
                   newItem.html('<a href="commsy.php?cid=' + contextID + '&mod=' + modArray[commsy_panel_index] + '&fct=edit&iid=NEW" title="' + new_action_message + '"><img src="images/commsyicons_msie6/16x16/new_home_big.gif"/></a>');
                 }
               }
            } else {
               if (navigator.userAgent.indexOf("MSIE 6.0") == -1){
                  newItem.html('<img src="images/commsyicons/16x16/new_home_big_gray.png" style="cursor:default;" alt="' + new_action_message + '" title="' + new_action_message + '"/>');
               } else {
                 newItem.html('<img src="images/commsyicons_msie6/16x16/new_home_big_gray.gif" style="cursor:default;" alt="' + new_action_message + '" title="' + new_action_message + '"/>');
               }
            }
            newItem.css('width', '18px');
            newItem.css('float', 'right');
            topBar.append(newItem);
         } else {
            if((modArray[commsy_panel_index] != 'user')){
               var img = jQuery('<img/>');
               img.attr('id', 'showHideButton' + commsy_panel_index);
               img.attr('src', 'images/arrow_up.gif');
               img.css('float', 'right');
               klick.append(img);
            }
         }

         topBar.append(klick);

         if(cookieArray[commsy_panel_index]){
            cookieValue = Get_Cookie(cookieArray[commsy_panel_index]);
            if(cookieValue ==1){
               panelDisplayed[commsy_panel_index] = true;
            }else{
               panelDisplayed[commsy_panel_index] = false;
            }
         }

         if(!panelDisplayed[commsy_panel_index]){
            outerContentDiv.hide();
            if (navigator.userAgent.indexOf("MSIE 6.0") == -1){
               contentDiv.css('top', '0px');
            }
            if(contentDiv.attr('id') != 'homeheader'){
               img.attr('src', 'images/arrow_down.gif');
            }
            klick.attr('id', klick.attr('id') + 'down');
            span.attr('id', span.attr('id') + 'down');
            span2.attr('id', span2.attr('id') + 'down');
         } else {
            klick.attr('id', klick.attr('id') + 'up');
            span.attr('id', span.attr('id') + 'up');
            span2.attr('id', span2.attr('id') + 'up');
         }

         topBar.attr('class', 'topBar');
         temp_div.append(topBar);
         temp_div.append(outerContentDiv);
         commsy_panel_index++;

         var childrenSpan = span.children();
         var hasLink = false;
         for(var index=0; index<childrenSpan.length; index++) {
            if(childrenSpan[index].tagName == 'A'){
               hasLink = true;
            }
         }
         if(!hasLink){
            span.click(showHidePaneContentTopBar);
            span.mouseover(mouseoverTopbarBar);
            span.mouseout(mouseoutTopbarBar);
         }

         span2.click(showHidePaneContentTopBar);
         span2.mouseover(mouseoverTopbarBar);
         span2.mouseout(mouseoutTopbarBar);

         klick.click(showHidePaneContentTopBar);
         klick.mouseover(mouseoverTopbarBar);
         klick.mouseout(mouseoutTopbarBar);
      }
   }
}

function showHidePaneContentTopBar(e,inputObj){
   if(!inputObj){
      inputObj = this;
   }
   var numericId = inputObj.id.replace(/[^0-9]/g,'');
   if(jQuery('#showHideButton' + numericId).length > 0){
      var img = jQuery('#showHideButton' + numericId);
   }
   var obj = jQuery('#paneContent' + numericId);
   if(inputObj.id.toLowerCase().indexOf('up')>=0){
      currentlyExpandedPane = false;
      jQuery('#klick' + numericId + 'up').attr('id', jQuery('#klick' + numericId + 'up').attr('id').replace('up','down'));
      jQuery('#span' + numericId + 'up').attr('id', jQuery('#span' + numericId + 'up').attr('id').replace('up','down'));
      jQuery('#spanKlick' + numericId + 'up').attr('id', jQuery('#spanKlick' + numericId + 'up').attr('id').replace('up','down'));
      if(jQuery('#showHideButton' + numericId).length > 0){
         img.attr('src', img.attr('src').replace('up','down'));
      }
      if (navigator.userAgent.indexOf("MSIE") == -1){
        obj.slideUp(200);
      } else {
         if(navigator.userAgent.indexOf("MSIE 6") != -1){
           obj.slideUp(200);
        } else {
           obj.animate({height: "0%", opacity: "0"}, 200);
        }
     }
      if(cookieNames[numericId]){
         Set_Cookie(cookieNames[numericId],'0',100000);
      }
   } else {
      if(this){
         currentlyExpandedPane = this;
      }else{
         currentlyExpandedPane = false;
      }
      jQuery('#klick' + numericId + 'down').attr('id', jQuery('#klick' + numericId + 'down').attr('id').replace('down','up'));
      jQuery('#span' + numericId + 'down').attr('id', jQuery('#span' + numericId + 'down').attr('id').replace('down','up'));
      jQuery('#spanKlick' + numericId + 'down').attr('id', jQuery('#spanKlick' + numericId + 'down').attr('id').replace('down','up'));
      if(jQuery('#showHideButton' + numericId).length > 0){
         img.attr('src', img.attr('src').replace('down','up'));
      }
      if (navigator.userAgent.indexOf("MSIE") == -1){
         obj.slideDown(200);
      } else {
         obj.animate({height: "100%", opacity: 1}, 200);
      }
      if(cookieNames[numericId]){
         Set_Cookie(cookieNames[numericId],'1',100000);
      }
   }
   return true;
}

function mouseoverTopbarBar(){
   var numericId = this.id.replace(/[^0-9]/g,'');
   if(jQuery('#showHideButton' + numericId).length > 0){
      jQuery('#showHideButton' + numericId).attr('src', jQuery('#showHideButton' + numericId).attr('src').replace('.gif','_over.gif'));
   }
   document.body.style.cursor = "pointer";
}

function mouseoutTopbarBar(){
   var numericId = this.id.replace(/[^0-9]/g,'');
   if(jQuery('#showHideButton' + numericId).length > 0){
      jQuery('#showHideButton' + numericId).attr('src', jQuery('#showHideButton' + numericId).attr('src').replace('_over.gif','.gif'));
   }
   document.body.style.cursor = "default";
}

function slidePane(slideValue,id,name){
   if(slideValue!=xpPanel_currentDirection[id]){
      return false;
   }
   var activePane = jQuery('#' + id);
   if(activePane==savedActivePane){
      var subDiv = savedActiveSub;
   }else{
      var subDiv = activePane.children('div:first');
   }
   savedActivePane = activePane;
   savedActiveSub = subDiv;

   var height = activePane.height();
   var innerHeight = subDiv.height();
   height+=slideValue;
   if(height<0){
      height=0;
   }
   if(height>innerHeight){
      height = innerHeight;
   }
   if(document.all){
      activePane.css('filter', 'alpha(opacity=' + Math.round((height / subDiv.height())*100) + ')');
   }else{
      var opacity = (height / subDiv.height());
      if(opacity==0){
         opacity=0.01;
      }
      if(opacity==1){
         opacity = 0.99;
      }
      activePane.css('opacity', opacity);
   }

   if(slideValue<0){
      activePane.css('height', height + 'px');
      subDiv.css('top', height - subDiv.height() + 'px');
      if(height>0){
         setTimeout('slidePane(' + slideValue + ',"' + id + '")',10);
      }else{
         if(document.all){
            activePane.css('display', 'none');
         }
      }
   }else{
      subDiv.css('top', height - subDiv.height() + 'px');
      activePane.css('height', height + 'px');
      if(height<innerHeight){
         setTimeout('slidePane(' + slideValue + ',"' + id + '")',10);
      }
   }
}

function cancelXpWidgetEvent(){
   return false;
}

function Set_Cookie(name,value,expires,path,domain,secure) {
   expires = expires * 60*60*24*1000;
   var today = new Date();
   var expires_date = new Date( today.getTime() + (expires) );
   var cookieString = name + "=" +escape(value) +
          ( (expires) ? ";expires=" + expires_date.toGMTString() : "") +
          ( (path) ? ";path=" + path : "") +
          ( (domain) ? ";domain=" + domain : "") +
          ( (secure) ? ";secure" : "");
   document.cookie = cookieString;
   //jQuery.cookie(escape(value), cookieString);
}

function Get_Cookie(name) {
   var start = document.cookie.indexOf(name+"=");
   var len = start+name.length+1;
   if ((!start) && (name != document.cookie.substring(0,name.length))){
      return null;
   }
   if (start == -1){
      return null;
   }
   var end = document.cookie.indexOf(";",len);
   if (end == -1){
      end = document.cookie.length;
   }
   return unescape(document.cookie.substring(len,end));
}

function initDeleteLayer(){
   jQuery('#delete').css('height', jQuery('body').height() - 140 + "px");
}

function initLayer(id){
   jQuery('#' + id).css('height', jQuery('body').height() + "px");
}

function handleWidth(id,max_width,link_name){
   jQuery(document).ready(function() {
      var inner_div = jQuery('#inner_' + id);
      var width = inner_div.attr("scrollWidth");
      var height = inner_div.attr("scrollHeight");
      if (width > max_width){
         inner_div.css('width', max_width+'px');
         if (navigator.userAgent.indexOf("MSIE") != -1){
            inner_div.css('height', (height+50)+'px');
         }
      }
   });
}

function right_box_send(form_id,option,value) {
  document.getElementById(option).value = value;
  //jQuery('#'.option).val(value);
  document.getElementById(form_id).submit();
  //jQuery('#'.form_id).submit();
}

var context_id;

function cs_toggle_template(){
   var id = jQuery("[name='template_select']");
   jQuery('#template_extention').html(template_array[id.val()]);
   if (id.val() != '-1'){
      showTemplateInformation();
   }
}

function initToggleTemplate(id){
   context_id = id;
   jQuery(document).ready(function() {
      var id = jQuery("[name='template_select']");
      if (id.val() != '-1'){
         jQuery('#template_extention').html(template_array[id.val()]);
         showTemplateInformation();
      }
   });
}

function showTemplateInformation(){
   jQuery('#template_information_box').hide();
   jQuery('#toggle'+context_id).click(function(){
      if(jQuery('#toggle'+context_id).attr('src').toLowerCase().indexOf('less') >= 0){
         jQuery('#template_information_box').slideUp(200);
         jQuery('#toggle'+context_id).attr('src', jQuery('#toggle'+context_id).attr('src').replace('less','more'));
      } else {
         jQuery('#template_information_box').slideDown(200);
         jQuery('#toggle'+context_id).attr('src', jQuery('#toggle'+context_id).attr('src').replace('more','less'));
      }
   });
   jQuery('#toggle'+context_id).mouseover(function(){
      jQuery('#toggle'+context_id).attr('src', jQuery('#toggle'+context_id).attr('src').replace('.gif','_over.gif'));
   });
   jQuery('#toggle'+context_id).mouseout(function(){
      jQuery('#toggle'+context_id).attr('src', jQuery('#toggle'+context_id).attr('src').replace('_over.gif','.gif'));
   });
}

var netnavigation_slide_speed = 50;	// Speed of slide
var rubric_index;
var count_rubrics = new Array();
var path_info = false;

var savedActiveNetnavigationPane = false;
var savedActiveNetnavigationSub = false;
var currentlyExpandedRubric = false;
var netnavigation_currentDirection = new Array();

function initDhtmlNetnavigation(element_id,panelTitles,rubric, item_id){
   var netnavigation = jQuery('#' + element_id + item_id);
   var netnavigation_divs = netnavigation.children('div:first');
   var divs = netnavigation_divs.find('div');
   var end = divs.length;
   rubric_index=0;
   for(var no=0;no<divs.length;no++){
      temp_div = jQuery(divs[no]);
      if(temp_div.attr('class') == element_id + '_panel'){
         var outerContentDiv = jQuery('<div></div>');
         var contentDiv = temp_div.children('div:first');
         outerContentDiv.append(contentDiv);

         outerContentDiv.attr('id', 'rubricContent' + item_id +'_'+ rubric_index);
         outerContentDiv.attr('class', 'panelContent');

         var topBar = jQuery('<div></div>');
         var img = jQuery('<img/>');
         img.attr('id', 'ShowHideRubricButton' + item_id +'_'+ rubric_index);
         img.attr('src', 'images/arrow_netnavigation_up.gif');
         topBar.append(img);

         var span = jQuery('<span></span>');
         span.html(panelTitles[rubric_index].replace(/&COMMSYDHTMLTAG&/g,'</'));
         topBar.append(span);

         topBar.css('position', 'relative');
         img.click(showHideRubricContent);
         img.mouseover(mouseoverTopbar);
         img.mouseout(mouseoutTopbar);
         if(rubric_index != rubric){
            outerContentDiv.hide();
            contentDiv.css('top', 0 - contentDiv.offsetHeight + 'px');
            img.attr('src', 'images/arrow_netnavigation_down.gif');
         }

        topBar.attr('class', 'tpBar');
        temp_div.append(topBar);
        temp_div.append(outerContentDiv);
        rubric_index++;
      }
      count_rubrics[item_id] = rubric_index;
   }
}

function mouseoverTopbar(){
   jQuery(this).attr('src', jQuery(this).attr('src').replace('.gif','_over.gif'));
}

function mouseoutTopbar(){
   jQuery(this).attr('src', jQuery(this).attr('src').replace('_over.gif','.gif'));
}

function showHideRubricContent(e,inputObj){
   if(!inputObj){
      inputObj = jQuery(this);
   }
   var my_array = inputObj.attr('id').split('_');
   var number = my_array[1].replace(/[^0-9]/g,'');
   var number_item_id = my_array[0].replace(/[^0-9]/g,'');
   for(var no=0;no<count_rubrics[number_item_id];no++){
      var img = jQuery('#ShowHideRubricButton' + number_item_id + '_' + no);
      var temp_number_array = img.attr('id').split('_');
      var numericId = temp_number_array[1].replace(/[^0-9]/g,'');
      var obj = jQuery('#rubricContent' + number_item_id + '_' + numericId);
      if(img.attr('src').toLowerCase().indexOf('up') >= 0){
         img.attr('src', img.attr('src').replace('up','down'));
         obj.css('display', 'block');
         obj.hide();
      }else if (number == no){
         img.attr('src', img.attr('src').replace('down','up'));
         obj.css('display', 'block');
         obj.slideDown(200);
      }
   }
   return true;
}

// Flash Player Version Definition for study.log
// -----------------------------------------------------------------------------
// Globals
// Major version of Flash required
var requiredMajorVersion = 9;
// Minor version of Flash required
var requiredMinorVersion = 0;
// Minor version of Flash required
var requiredRevision = 124;
// -----------------------------------------------------------------------------

function getFlashMovie(movieName) {
   var isIE = navigator.appName.indexOf("Microsoft") != -1;
   return (isIE) ? window[movieName] : document[movieName];
}

function callStudyLogSortChronological() {
   getFlashMovie("study_log").callStudyLogSortChronological("");
}
function callStudyLogSortAlphabetical() {
   getFlashMovie("study_log").callStudyLogSortAlphabetical();
}
function callStudyLogSortDefault() {
   getFlashMovie("study_log").callStudyLogSortDefault();
}
function callStudyLogSortByTag(tag) {
   getFlashMovie("study_log").callStudyLogSortByTag(tag);
}
function callStudyLogSortByTagId(tagId) {
   getFlashMovie("study_log").callStudyLogSortByTagId(tagId);
}

jQuery(document).ready(function() {
   if (navigator.userAgent.indexOf("MSIE 6.0") == -1){
	   jQuery.datepicker.regional['de'] = {//clearText: 'löschen',
	                                 //clearStatus: 'aktuelles Datum löschen',
	                                 //closeText: 'schließen',
	                              //closeStatus: 'ohne Änderungen schließen',
	                              //prevText: '',
	                              //prevStatus: 'letzten Monat zeigen',
	                              //nextText: '',
	                              //nextStatus: 'nächsten Monat zeigen',
	                              //currentText: 'heute',
	                              //currentStatus: '',
	                              monthNames: ['Januar','Februar','März','April','Mai','Juni','Juli','August','September','Oktober','November','Dezember'],
	                              monthNamesShort: ['Jan','Feb','Mär','Apr','Mai','Jun','Jul','Aug','Sep','Okt','Nov','Dez'],
	                              //monthStatus: 'anderen Monat anzeigen',
	                              //yearStatus: 'anderes Jahr anzeigen',
	                              //weekHeader: 'Wo',
	                              //weekStatus: 'Woche des Monats',
	                              dayNames: ['Sonntag','Montag','Dienstag','Mittwoch','Donnerstag','Freitag','Samstag'],
	                              dayNamesShort: ['So','Mo','Di','Mi','Do','Fr','Sa'],
	                              dayNamesMin: ['So','Mo','Di','Mi','Do','Fr','Sa'],
	                              //dayStatus: 'Setze DD als ersten Wochentag',
	                              //dateStatus: 'Wähle D, M d',
	                              dateFormat: 'dd.mm.yy',
	                              firstDay: 1,
	                              //initStatus: 'Wähle ein Datum',
	                              isRTL: false};
	   jQuery.datepicker.regional['en'] = {//clearText: 'löschen',
	                                 //clearStatus: 'aktuelles Datum löschen',
	                                 //closeText: 'schließen',
	                                 //closeStatus: 'ohne Änderungen schließen',
	                                 //prevText: '',
	                                 //prevStatus: 'letzten Monat zeigen',
	                                 //nextText: '',
	                                 //nextStatus: 'nächsten Monat zeigen',
	                                 //currentText: 'heute',
	                                 //currentStatus: '',
	                                 //monthNames: ['Januar','Februar','März','April','Mai','Juni','Juli','August','September','Oktober','November','Dezember'],
	                                 //monthNamesShort: ['Jan','Feb','Mär','Apr','Mai','Jun','Jul','Aug','Sep','Okt','Nov','Dez'],
	                                 //monthStatus: 'anderen Monat anzeigen',
	                                 //yearStatus: 'anderes Jahr anzeigen',
	                                 //weekHeader: 'Wo',
	                                 //weekStatus: 'Woche des Monats',
	                                 //dayNames: ['Sonntag','Montag','Dienstag','Mittwoch','Donnerstag','Freitag','Samstag'],
	                                 //dayNamesShort: ['So','Mo','Di','Mi','Do','Fr','Sa'],
	                                 //dayNamesMin: ['So','Mo','Di','Mi','Do','Fr','Sa'],
	                                 //dayStatus: 'Setze DD als ersten Wochentag',
	                                 //dateStatus: 'Wähle D, M d',
	                                 dateFormat: 'dd.mm.yy',
	                                 firstDay: 1,
	                                 //initStatus: 'Wähle ein Datum',
	                                 isRTL: false};
	   if(window.datepicker_language !== undefined && datepicker_language == 'de'){
	      jQuery.datepicker.setDefaults($.datepicker.regional['de']);
	   } else {
	     jQuery.datepicker.setDefaults($.datepicker.regional['en']);
	   }
	   if (navigator.userAgent.indexOf("MSIE 6.0") == -1){
	      datepicker_image = 'images/commsyicons/datepicker.png';
	   } else {
	      datepicker_image = 'images/commsyicons/datepicker.gif';
	   }
	   if(jQuery("input[name='dayStart']").length){
	      jQuery("input[name='dayStart']").datepicker({showOn: 'button', buttonImage: datepicker_image, buttonImageOnly: true, buttonText: datepicker_choose});
	   }
	   if(jQuery("input[name='dayEnd']").length){
	      jQuery("input[name='dayEnd']").datepicker({showOn: 'button', buttonImage: datepicker_image, buttonImageOnly: true, buttonText: datepicker_choose});
	   }
	   if(jQuery("input[name='dayActivateStart']").length){
	      jQuery("input[name='dayActivateStart']").datepicker({showOn: 'button', buttonImage: datepicker_image, buttonImageOnly: true, buttonText: datepicker_choose});
	   }
   }
});

jQuery(document).ready(function() {
	jQuery("a[name^='calendar_link']").hover(
		function() {
			jQuery(this).next("em").animate({opacity: "show", top: "-75"}, "slow");
		}, function() {
			jQuery(this).next("em").animate({opacity: "hide", top: "-85"}, "fast");
		});
});

var scrollbar_width = 12;

jQuery(document).ready(function() {
	if(jQuery('#calender_main').length){
		jQuery('#calender_main').jScrollPane({scrollbarWidth: scrollbar_width});
		jQuery('.jScrollPaneContainer').css('border-top', '1px solid black');
		jQuery('#calender_frame').css('background-color',jQuery('[id^=calendar_head]').css('background-color'));
		addNewDateLinks();
		resize_calendar();
		draw_dates();
		jQuery('#calender_main')[0].scrollTo(321);
		$(window).resize(function(){
			//jQuery('#calender_frame').css('width', '100%');
			//jQuery('#calender_main').css('width', '100%');
			//jQuery('jScrollPaneContainer').width('100%');
			resize_calendar();
			draw_dates();
		});
	}
});

function resize_calendar(){
	var frame_width = jQuery('#calender_frame').width();
	var main_width = frame_width - scrollbar_width;
	var time_width = main_width * 0.02;
	var time_width_array = time_width.toString().split('.');
	time_width = time_width_array[0];
	var entry_width = main_width * 0.14;
	var entry_width_array = entry_width.toString().split('.');
	entry_width = entry_width_array[0];
	jQuery('#calender_main').css({width: frame_width - scrollbar_width+'px'});
	jQuery('.calender_hour').css({width: frame_width - scrollbar_width+'px'});
	jQuery('.calendar_time').css({width: time_width+'px'});
	jQuery('.calendar_time_head').css({width: time_width+'px'});
	jQuery('[id^=calendar_entry]').css({width: entry_width+'px'});
	jQuery('[id^=calendar_head]').css({width: entry_width+'px'});
}

function draw_dates(){
	jQuery('div[name=calendar_date]').remove();
	var left_position = 0;
	var current_day = '';
	var tooltip_added = false;
	if(typeof(calendar_dates) != 'undefined'){
		for (var i = 0; i < calendar_dates.length; i++) {
			var day = calendar_dates[i][0]-1;
			if(current_day != day){
				current_day = day;
				left_position = 0;
			}
			if(i+1 < calendar_dates.length){
				var next_day = calendar_dates[i+1][0]-1;
			} else {
				var next_day = 'none';
			}
			var title = calendar_dates[i][1];
			var start_quaters = calendar_dates[i][2];
			var end_quaters = calendar_dates[i][3];
			var dates_on_day = calendar_dates[i][4];
			var color = calendar_dates[i][5];
			var color_border = calendar_dates[i][6];
			var href = calendar_dates[i][7];
			var tooltip = calendar_dates[i][8];
			
			if(start_quaters % 4 == 0){
				var start_div = start_quaters / 4;
				var top = 0;
			} else {
				var start_div = (start_quaters - start_quaters % 4) / 4;
				var top = (start_quaters % 4) * 10;
			}
			top = top+1;
			
			if(end_quaters != 0){
				var height = (end_quaters - start_quaters) * 10; // + ((end_quaters - start_quaters) / 4)-1;
			} else {
				var height = 40;
			}
			
			var start_spacer = 0;
			var end_spacer = 0;
			var between_space = (dates_on_day -1) * 0;
			var width_div = jQuery('#calendar_entry_date_div_' + start_div + '_'+day).width()-1;
			var width = width_div; // - (start_spacer + end_spacer) - between_space;

			if(width % dates_on_day == 0){
			   width = width / dates_on_day;
			   var width_rest = 0;
			} else {
			   width = (width - (width % dates_on_day)) / dates_on_day;
			   var width_rest = width % dates_on_day;
			}
			//width = width-2-width_rest;
			//if(left_position == 0){
			//   var left = left_position * width + 2;
			//} else {
			   var left = (left_position * width)+1;// + ((left_position+1) * 2);
			//}
			   
			// Ausgleich border
			width = width-2;
			height = height-2-1;

	    	if(next_day == 'none'){
	    		width = width + width_rest + (width_div - ((width + 2) * dates_on_day));
	    	}
		    left_position++;
		    
		    if(start_quaters == 0 && end_quaters == 0){
		    	jQuery('#calendar_entry_date_div_'+day).prepend('<div name="calendar_date" style="position:absolute; top:' + (top + 1) + 'px; left:' + left + 'px; height:' + (jQuery('#calendar_day_'+day).height()-4) + 'px; width:' + width + 'px; background-color:' + color + '; z-index:1000; overflow:hidden; border:1px solid ' + color_border + ';"><div style="width:1000px; text-align:left; position:absolute; top:0px; left:0px;">' + title + '</div><div style="position:absolute; top:0px; left:0px; height:100%; width:100%;" data-tooltip="sticky1"><a href="' + href + '"><img src="images/spacer.gif" style="height:100%; width:100%;"/></a></div></div>');
		    } else {
		    	jQuery('#calendar_entry_date_div_' + start_div + '_'+day).prepend('<div name="calendar_date" style="position:absolute; top:' + top + 'px; left:' + left + 'px; height:' + height + 'px; width:' + width + 'px; background-color:' + color + '; z-index:1000; overflow:hidden; border:1px solid ' + color_border + ';"><div style="width:1000px; text-align:left; position:absolute; top:0px; left:0px;">' + title + '</div><div style="position:absolute; top:0px; left:0px; height:100%; width:100%;"><a href="' + href + '" data-tooltip="' + tooltip + '"><img src="images/spacer.gif" style="height:100%; width:100%;"/></a></div></div>');
		    }
		    //jQuery('#mystickytooltip').append('<div id="sticky_' + start_div + '_' + day + '">Sticky Tooptip 1 content here...</div>');
	    }
		stickytooltip.init("*[data-tooltip]", "mystickytooltip")
	}
	if(typeof(today) != 'undefined'){
		if(today != ''){
			var today_color = '#fdefbf'
			jQuery.each(jQuery('[id^=calendar_head]'), function(){
				if((jQuery(this).attr('id').indexOf(today)) != -1){
					//jQuery(this).css('background-color', today_color);
					var today_array = jQuery(this).attr('id').split('_');
					var today_index = today_array[2];
					jQuery('#calendar_entry_' + today_index).css('background-color', today_color);
					for ( var index = 0; index <= 23; index++) {
						jQuery('#calendar_entry_' + index + '_' + today_index).css('background-color', today_color);
					}
				}
			});
		}
	}
}

function addNewDateLinks(){
	if(typeof(new_dates) != 'undefined'){
		for (var i = 0; i < new_dates.length; i++) {
			jQuery(new_dates[i][0]).append(new_dates[i][1]);
		}
	}
}