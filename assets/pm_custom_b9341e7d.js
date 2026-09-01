var scrollSectionsToAddCount=3

function populateTwitterEmbeds() {
 
  
  
     document.querySelectorAll('div:not(#scroll-section-0) blockquote[class="twitter-tweet"]').forEach(function(item) {
       
            const regex = /https:\/\/twitter.com\/[^\/]*\/status\/(\d+)/mi;
       
            const match = item.outerHTML.match(regex);
            
           // log.debug('twitter match');
      
            if (match!==null) {
                      log.debug(match[1]);
                      let id=match[1];
                      
         
            let f = '<div class="twitter-tweet twitter-tweet-rendered" style="display: flex; max-width: 550px; width: 100%; margin-top: 10px; margin-bottom: 10px;"><iframe id="twitter-widget-0" scrolling="no" frameborder="0" allowtransparency="true" allowfullscreen="true" class="" title="X Post" src="https://platform.twitter.com/embed/Tweet.html?dnt=false&amp;embedId=twitter-widget-0&amp;features=eyJ0ZndfdGltZWxpbmVfbGlzdCI6eyJidWNrZXQiOltdLCJ2ZXJzaW9uIjpudWxsfSwidGZ3X2ZvbGxvd2VyX2NvdW50X3N1bnNldCI6eyJidWNrZXQiOnRydWUsInZlcnNpb24iOm51bGx9LCJ0ZndfdHdlZXRfZWRpdF9iYWNrZW5kIjp7ImJ1Y2tldCI6Im9uIiwidmVyc2lvbiI6bnVsbH0sInRmd19yZWZzcmNfc2Vzc2lvbiI6eyJidWNrZXQiOiJvbiIsInZlcnNpb24iOm51bGx9LCJ0ZndfZm9zbnJfc29mdF9pbnRlcnZlbnRpb25zX2VuYWJsZWQiOnsiYnVja2V0Ijoib24iLCJ2ZXJzaW9uIjpudWxsfSwidGZ3X21peGVkX21lZGlhXzE1ODk3Ijp7ImJ1Y2tldCI6InRyZWF0bWVudCIsInZlcnNpb24iOm51bGx9LCJ0ZndfZXhwZXJpbWVudHNfY29va2llX2V4cGlyYXRpb24iOnsiYnVja2V0IjoxMjA5NjAwLCJ2ZXJzaW9uIjpudWxsfSwidGZ3X3Nob3dfYmlyZHdhdGNoX3Bpdm90c19lbmFibGVkIjp7ImJ1Y2tldCI6Im9uIiwidmVyc2lvbiI6bnVsbH0sInRmd19kdXBsaWNhdGVfc2NyaWJlc190b19zZXR0aW5ncyI6eyJidWNrZXQiOiJvbiIsInZlcnNpb24iOm51bGx9LCJ0ZndfdXNlX3Byb2ZpbGVfaW1hZ2Vfc2hhcGVfZW5hYmxlZCI6eyJidWNrZXQiOiJvbiIsInZlcnNpb24iOm51bGx9LCJ0ZndfdmlkZW9faGxzX2R5bmFtaWNfbWFuaWZlc3RzXzE1MDgyIjp7ImJ1Y2tldCI6InRydWVfYml0cmF0ZSIsInZlcnNpb24iOm51bGx9LCJ0ZndfbGVnYWN5X3RpbWVsaW5lX3N1bnNldCI6eyJidWNrZXQiOnRydWUsInZlcnNpb24iOm51bGx9LCJ0ZndfdHdlZXRfZWRpdF9mcm9udGVuZCI6eyJidWNrZXQiOiJvbiIsInZlcnNpb24iOm51bGx9fQ%3D%3D&amp;frame=false&amp;hideCard=false&amp;hideThread=false&amp;id=' + id + '&amp;lang=en&amp;origin=https%3A%2F%2Fwww.jezebel.com%2Fhilary-duffs-husband-has-entered-the-ashley-tisdale-toxic-mom-group-chat&amp;sessionId=4649a6df74887613c845b43c8c53618983bccc72&amp;siteScreenName=jezebel&amp;theme=light&amp;widgetsVersion=2615f7e52b7e0%3A1702314776716&amp;width=550px" style="position: static; visibility: visible; width: 550px; height: 830px; display: block; flex-grow: 1;" data-tweet-id="' + id + '"></iframe></div>';
            
               item.outerHTML = f;
                }
            });
            
           
            
}

function populateBlueskyEmbeds() {
 
  
  let EMBED_URL = 'https://embed.bsky.app';
  
  window.addEventListener('message', function (event) {
    if (event.origin !== EMBED_URL) {
        return;
    }
 
    var id = event.data.id;
    if (!id) {
        return;
    }
    var embed = document.querySelector("[data-bluesky-id=\"".concat(id, "\"]"));
    if (!embed) {
        return;
    }
 
    var height = event.data.height;
    if (height) {
        embed.style.height = "".concat(height, "px");
       // log.debug('adjust bluesky height');
    }
});
    
     document.querySelectorAll('blockquote[class="bluesky-embed"]').forEach(function(item) {
        
            const regex = /data-bluesky-uri="(.*?")/mi;
       
            const match = item.outerHTML.match(regex);
            if (match!==null) {
        


          
             let u = match[1].replace('at://','').replace('"','');
        
                let fid=Math.floor(Math.random() * (99999999999 - 100000 + 1)) + 100000
            let f = '<div class="bluesky-embed" style="max-width: 600px; width: 100%; margin-top: 10px; margin-bottom: 10px; display: flex;"><iframe data-bluesky-id="' + fid + '" src="https://embed.bsky.app/embed/' + u +'?id=' + fid + '&amp;ref_url=&amp;colorMode=system" width="100%" frameborder="0" scrolling="no" style="border: none; display: block; flex-grow: 1;"></iframe></div>';
          
                item.outerHTML = f;
                }
            });
            
           
           
           
}





let scrollTracker = {lastAdRefresh: new Date(),
                     lastPageViewRecorded: new Date(),
                     isOkToRefreshAd() { 
                       // let date = new Date();
                       // let fakeDate = new Date();
                       // fakeDate.setMinutes(date.getSeconds() - 30);
                        //lastAdRefresh=fakeDate;
  
                        //let td = (date - lastAdRefresh) / (1000 * 60);
                            
                         
                       // log.info(td);
                        if (this.lastAdRefresh===null) {
                            log.info('lastAdRefresh: true'); 
                            return true; 
                            
                        } else if ( this.getElapsedSeconds(this.lastAdRefresh) >10) {
                            log.info('lastAdRefresh: true'); 
                            return true;
                             
                        } else {
                            log.info('lastAdRefresh: false'); 
                            return false
                        }
                    },
                      isOkToSendPageView() {let date = new Date();
                      
                
                       // log.info(td);
                        if (this.lastPageViewRecorded===null) {
                            log.info('lastPageViewRecorded: true'); 
                            return true; 
                            
                        } else if ( this.getElapsedSeconds(this.lastPageViewRecorded) >10) {
                            log.info('lastPageViewRecorded: true'); 
                            return true;
                             
                        } else {
                            log.info('lastPageViewRecorded: false'); 
                            return false
                        }
                          
                     },
                     refreshAds() {
                          //this.lastAdRefresh=new Date();
                         if (this.isOkToRefreshAd()) {
                            this.forceRefreshAds();
                            return true;
                         } else {
                            return false;
                         }
                     },
                     recordPageView(scrollElement) {
                        // this.lastPageViewRecorded=new Date();
                         if (this.lastPageViewRecorded()) {
                            this.forceRecordPageView();
                            return true;
                         } else {
                            return false;
                         }
                     },
                     getElapsedSeconds(oldDate) {
                           let date = new Date();
                            let et = (date - oldDate) / (10 * 60)
                            log.info(et);
                       return et;
                     },
                     forceRecordPageView(scrollElement) {
                         

     
                        let thisUrl = scrollElement.getAttribute('url')
    
       
   
                        let title = scrollElement.getAttribute("seo_title");
    
                        thisUrl=AddTrailingSlash(thisUrl);
                        const url = new URL(thisUrl);
                          log.debug(title);
                        log.debug(thisUrl);
                        log.debug(url.pathname);
                        gtag('event', 'page_view', {
                          page_title: title,
                          page_location: thisUrl,
                          page_path: url.pathname
                        });
                        this.lastPageViewRecorded=new Date();
                        log.info('page_view recorded');
                     },
                     forceRefreshAds() {
                         if ( typeof htlbid !== 'undefined' && htlbid !== null ) { 
                        if (document.querySelector("#bottom_leaderboard")!==null) {
                            htlbid.reloadSlot('bottom_leaderboard');
                        }
                        if ((document.querySelector("#above_logo")!==null) && document.querySelector("#above_logo").checkVisibility()) {
                            htlbid.reloadSlot('above_logo');
                        } else {
                             if (document.querySelector("#top_leaderboard")!==null) {
                               htlbid.reloadSlot('top_leaderboard');
                             }
                        }
                        this.lastAdRefresh= new Date();
                     }
                     }
};



document.addEventListener("DOMContentLoaded", () => {
     
    log.setDefaultLevel(log.levels.TRACE, true);

    log.setLevel('silent', true);
     
        
   
         
});
 
 var origUrl = null;
var bottomOfPreviousSection=0;
var isInitialpositionRightRailAds=true;
//var resizeObserver;
let prevEntry=null;
var lastIntersection=null;
var lastIntersectionScrollY=0;
var currentIntersectionEntry=null;
var lastObserverTriggered=null;

/*resizeObserver = new ResizeObserver(entries => {
                            for (let entry of entries) {
                                log.debug('Div size changed:', entry.contentRect.width, entry.contentRect.height);
                                 positionRightRailAds(30);
                            }
                            }); */
                            
                            
var observer;

var doScroll=true;
//if (true || window.location.href=='https://www.jezebel.com/jim-caviezel') {
 //   doScroll = true;
//}
// if (getUrlParam('s')=='scroll') {
    
//   doScroll = true;
// }
//log.debug('let us do it: ' + doScroll);





function scrollToAudioPlayer($clickedEl) {
   event.preventDefault();
   log.debug($clickedEl);
   let post_id=$clickedEl.getAttribute("post_id");
   log.debug(post_id);
   
   // log.debug('scrollToAudioPlayer');
  //  $clickedEl=jQuery($clickedEl);
   // log.debug($clickedEl);
   // $at = $clickedEl.attr("href");
    let at="#audio-title[post_id='" + post_id + "']";
  //  let at="#audio-title-" + post_id ;
          // log.debug($at);  
            //    log.debug(jQuery($at).offset().top);
   log.debug(at);
                jQuery('html, body').animate({
                      scrollTop: jQuery(at).offset().top - 200
                    },0);
                  document.querySelector("#tts-player[post_id='" + post_id + "']").play();
                  return false;
}
function getUrlParam(name) {
    let r = '';
    const queryString = window.location.search;
      const urlParams = new URLSearchParams(queryString);

      if (queryString !== "") {
         r =   urlParams.get(name);
      }
      
      return r;
}
function getCommentCount(obj,url,postId) {
   //  var u = new URL(window.location);
   // u.hash = '';
   // u.search = '';
    // log.debug(url);
    //log.debug(obj.id);
    
 //    type: 'get',url: 'https://disqus.com/api/3.0/threads/details.json?api_key=rI9PSTKxFdaoFerkDzYfy3OlzHelmyvBy4PDZaCKGl9K2alhBFqDigdnVcqpxMYx&callback=foo&forum=paste-magazine&thread=link:' + loc ,
   url = url.replace('?s=scroll','');
   
   /* jQuery.ajax({
  type: 'get',url: 'https://disqus.com/api/3.0/threads/details.json?api_key=mZyGvuGCJddMuwBLSBOrVIYboExFoMNur40ypGj1ZCMFOSKsXDbi17RhenUYeBDV&callback=foo&forum=jezebel-1&thread=link:' + loc ,
  */
  jQuery.ajax({
  type: 'get',url: 'https://disqus.com/api/3.0/threads/details.json?api_key=mZyGvuGCJddMuwBLSBOrVIYboExFoMNur40ypGj1ZCMFOSKsXDbi17RhenUYeBDV&callback=foo&forum=jezebel-1&thread=link:' + encodeURIComponent(url),
  success: function (data) {
     
    let r = data.match(/\"posts\":(\d+)/);
    //log.debug('getCommentCount');
  //  log.debug('count: ' + r[1]);
   //   log.debug(url);
   
    let x = document.getElementById( 'comment-count-' + postId);
  
    if (x!==null) {
       x.innerText=r[1]; // + 'x';
       
  
    }
    x = obj.querySelector('#show-comment-block');
 
   if (x!==null) {
        if (r[1] === '0' || r[1] === '' ) {
            x.innerText=('Start the discussion...');
        } else  if (r[1] == '1'  ) { 
            x.innerText=('Continue the discussion...');
        } else    { 
            x.innerText=('Show all ' + r[1] + ' comments...');
        }
    }
 
   
  },
    error: function (request, status, error) {
        console.error(error);
    }
  
}); 
    
    
}
function showCommentsTopArticle(obj,postId) {
  
    let commentParent=obj.parentNode.parentNode;
   
      let hideMe = commentParent.querySelector('#disqus-comment-count-wrapper')
  
      hideMe.classList.add("hide");
       let showMe = commentParent.querySelector('#disqus_thread');
         showMe.classList.remove("hide");
}
function parent (element, n = 1, matchId='') {
    let r = false;
    let {parentNode} = element;
      for (let i = 1; parentNode && i < n; i++) {
        ({parentNode} = parentNode);
       // log.debug ('parent');
        // log.debug (parentNode);
        if (parentNode === null || parentNode.lenght===0) {
            break;
        } else if (parentNode.id==matchId) {
            r=true;
            break;
        }
        //log.debug('parent id: ' + parentNode.id);
      // log.debug ('parent after');
      }
  
  return r;
}
function showCommentsForScroll(obj,postId) {
    log.debug('showCommentsForScroll let us do it: ' + doScroll);
   if (doScroll) {
    //log.debug('showCommentsForScroll');
    //   log.debug(obj);
        //  log.debug(postId);
   let isFirstComentBlock =  parent(obj,10,'scroll-section-0');
    
    //scroll-section-0
    if (false && isFirstComentBlock) {
        showCommentsTopArticle(obj,postId);
    } else {
    
    //log.debug(obj);
    let commentParent=obj.parentNode.parentNode;
   //  log.debug('commentParent');
     //log.debug(commentParent);
     
     
     
     //
     
       document.querySelectorAll('li[id^="block-"]').forEach(function(item) {
         log.debug(item.id);
        item.style.display='block';
            });
     
     document.querySelectorAll('#disqus-comment-count-wrapper').forEach(function(item) {
         
        item.style.display='block';
            });
     let hideMe = commentParent.querySelector('#disqus-comment-count-wrapper')
 
      hideMe.classList.add("hide");
  
      let btn = commentParent.querySelector('#show-comments-button')
     let wrapper = commentParent.querySelector('#disqus-comment-count-wrapper')
 //wp-block-comments hide
    let block = commentParent.querySelector('#comments.wp-block-comments')
    log.debug('remove hide');
    log.debug(block);
    if (block)  {
    block.classList.remove("hide");
    }
 
     
     let art = document.querySelector("article[post_id='" + postId + "']")
 
     let url = document.querySelector("div[post_id='" + postId + "'].scroll-article-container").getAttribute("url")
     let title = document.querySelector("div[post_id='" + postId + "'].scroll-article-container").querySelector("h1.title").innerText
     
     let auri=getAbsolutePath(url).replace("/", "");
 
     loadDisqusComments(postId, postId + " " + auri , title,url);
 
 
   /*
    const timeoutId = setTimeout(() => {
         positionRightRailAds();
      
        }, 5000); */
    }
    }
}          

const getAbsolutePath = (urlString) => {
  try {
    const url = new URL(urlString);
    return url.pathname;
  } catch (error) {
    // Handle invalid URLs if necessary
    console.error("Invalid URL:", error);
    return null;
  }
};

function loadDisqusComments (postId,newIdentifier, newTitle, newUrl) {
    // If DISQUS is not yet loaded, load the embed script first
// log.debug('loadDisqusComments');
 // log.debug(newIdentifier);
 // log.debug(newTitle);
   // log.debug(newUrl);
       newUrl = newUrl.replace('?s=scroll','');
        log.debug(newUrl);
     document.querySelectorAll("div[id^='disqus_thread']").forEach(function(item) {
         log.debug('empty disqus_thread div');
      item.innerHTML='';
            });
     let container_id =  'disqus_thread_'+postId;
     window.disqus_container_id = container_id;
    if (typeof DISQUS === 'undefined') {
        window.disqus_shortname = 'avclub'; // Replace with your shortname
        window.disqus_identifier = newIdentifier;
        window.disqus_title = newTitle;
        window.disqus_url = newUrl;

        // Append the disqus_thread div if it doesn't exist
        if (!document.getElementById('disqus_thread')) {
            const disqusThreadDiv = document.createElement('div');
            disqusThreadDiv.id = container_id; //'disqus_thread_'+postId;
            document.body.appendChild(disqusThreadDiv); // Or append to a specific container
        }

        // Load the Disqus embed script
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = `//${window.disqus_shortname}.disqus.com/embed.js`;
        script.setAttribute('data-timestamp', +new Date());
        (document.head || document.body).appendChild(script);
    } else {
        // Disqus is already loaded, reset it for the new thread
        DISQUS.reset({
            reload: true,
            config: function() {
                this.page.identifier = newIdentifier;
                this.page.title = newTitle;
                this.page.url = newUrl;
            }
        });
    }
    
     // log.debug('unobserve', observer);
  observer.disconnect(); 
  
 

    
     let newSections = document.querySelectorAll('div[id^="scroll-section-"]');
                           
                        
                
     newSections.forEach(section => {
                          
                       
                              observer.observe(section);
    });
    
    
    
     
    //const timeoutId = setTimeout(() => {
    //     positionRightRailAds(26);
      //
      //  }, 5000);
    
}



function setStickyAside() {
    /*
    const ismbr= isMemberOrEditor();
  console.log('setStickyAside()');
   
   //if (!ismbr){
        let elx = document.querySelector('.widget-container.widget_block');
        
        let isLandingPage = false;
        if( document.querySelector('.landing-top') !== null){
            isLandingPage=true;
        }
      
      
        let isTall = window.innerHeight>1024;
   
        elx.classList.add("fixed");
           
           if (isTall) {
                elx.classList.add("tall");
                
           }
        
   */
}




window.onscroll = function() {scrollFunction()};

function scrollFunction() {
    const ismbr= isMemberOrEditor();
  
   
    
   
    const  el = document.getElementsByClassName("bottom-link-row");
    if( el !== null && el.length>0) {
      //  log.debug('add fixed listener');
      //  document.addEventListener("DOMContentLoaded", () => {
        const topLeader=document.getElementById('top_leaderboard');
        const aboveLogo=document.getElementById('above_logo') 
        
        
       if (topLeader === null) {
               log.debug('top_leaderboard: null');
        } else {
         log.debug('top_leaderboard: ' +  topLeader.clientHeight);
     }


       if (aboveLogo === null) {
            
                log.debug('above_logo: null');
        } else {
            
          log.debug('above_logo: ' +  aboveLogo.clientHeight);
        }
        let ss = '';
        
        if (window.innerWidth<480) {
             ss = 'm';
        } else {
            ss = 'd';
        }
        
     log.debug('ss: ' +  ss);
         if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
                el[0].classList.add('fixed');
            
            if(ismbr) {
                 el[0].classList.add('no-ads');
                //   log.debug('ads hidden');
            } else if ( ss=='m' && (topLeader===null || topLeader.clientHeight===0) ) {
                   el[0].classList.add('no-ads');
                  //   log.debug('ads hidden');
            } else if ( ss=='d' && (aboveLogo===null || aboveLogo.clientHeight===0) ) {
                   el[0].classList.add('no-ads');
                 //  log.debug('ads hidden');
            } else {
                 // log.debug('ads not hidden');
            }
        } else {
                el[0].classList.remove('fixed');
                el[0].classList.remove('no-ads');
        }
     //   });
    }
}






/*jQuery(document).ready(function ($) {
   log.debug('JQuery Ready.');
}); */

function getCookie(name) {
  var match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  if (match) return match[2];
}


//
function getIsLoggedViaCookie() {
    let name = 'wordpress_test_cookie';
  var match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  if (match) return match[2];
}


function positionRightRailAds(additionalFudge=0){
    /*
      log.debug('positionRightRailAds() ' + additionalFudge);
      
      if (isInitialpositionRightRailAds) {
          additionalFudge=0;
          
          isInitialpositionRightRailAds=false;
      }
      if (document.getElementById('scroll-section-0').getBoundingClientRect().height<2000) {
        document.getElementById('sidebar-recommended').style.display='none';
      }
    for (let step = 1; step <= 7; step++) {
        setAdPositionRightRail(step,-28 + additionalFudge)
    }
    */
}


function setAdPositionRightRail(adNumber, fudge) {
    let tp = document.querySelector('#top_rectangle_side_' + adNumber);
    let mp =  document.querySelector('#middle_rectangle_side_' + adNumber)
    if (tp) {
        let topParent = tp.parentElement;
        let middleParent =  mp.parentElement;
        if (window.innerWidth>=640) {
         
            let scrollSection =  document.querySelector('#scroll-section-' + (adNumber));
            topParent.style.display = "block";
            topParent.style.position = "absolute";
            topParent.style.top = scrollSection.getBoundingClientRect().top + (window.scrollY + fudge ) +"px" ;
            //  log.debug('topParent: ' + topParent.style.top);
             
              
            middleParent.style.display = "block";
            middleParent.style.position = "absolute";
            middleParent.style.top = scrollSection.getBoundingClientRect().top + (  window.scrollY + 650 + fudge) +"px" ;
             log.debug('middleParent: ' + scrollSection.getBoundingClientRect().top);
        } else {
             
            if (topParent!==null) {
                 topParent.remove();
            }
            if (middleParent!==null) {
               middleParent.remove();
            }
        }
    }
}

function isLoggedInViaClass() {
    
    
    
  
  isLoggedIn = document.body.classList.contains('logged-in');
    if (isLoggedIn) {
      return true;
  } else  {
      return false;
  }
   
 
}
function getJMemberLevel() {
  return getCookie('jmemberlevel') ;
}

function getIsAccessToRestrictedContentAllowed() {
    let c = getCookie('jmemberlevel');

  return ( c == '2' || c == '3' ) ;
}

function getIsRestrictedContent() {
    var el = document.getElementById('is-restricted-content')
    if (el) {
        if (el.value == '1' ) {
          //  log.debug('Content is restriced');
            return true;
        } else {
           //  log.debug('Content is public');
             return false;
        }



    }


}


function getIsLoggedInMember() {
    if (getCookie('jmemberlevel')  && getIsLoggedViaCookie()) {
        return true;
    } else  {
        
        return false;
    }
    
}


/*
function initCommentSetupForCachedPage() {
   log.debug('initCommentSetupForCachedPage');
    let pmb =  document.querySelector('comments-login-request');
    //.wpd-login-to-comment
         if (pmb) {
             log.debug('initCommentSetupForCachedPage2');
            // log.debug( pmb.innerHTML);
             // log.debug(pmb);
                 pmb.outerHTML = '<a href="/login" class="wpd-login-to-comment-link">' + pmb.outerHTML + '</a>';
            pmb.style.display = "";
         }
         //
         
           pmb =  document.querySelector('.wpd-login > a');
         if (pmb) {
             // log.debug('initCommentSetupForCachedPage3');
              // log.debug(pmb);
               pmb.setAttribute('href', "/membership-account");
         }
         
            pmb =  document.querySelectorAll('.wpd-login > a');
         if (pmb) {
            //log.debug('initCommentSetupForCachedPage4');
              // log.debug(pmb[1]);
               if (pmb[1]) {
               pmb[1].setAttribute('href', "/logout");
               }
         }
         //
            pmb =  document.querySelector('.wpd-load-more-submit-wrap > button.wpd-load-comments.wpd-prim-button');
         if (pmb) {
             let ccnt = '';
               //log.debug('initCommentSetupForCachedPage5');
             //<div class="wpd-thread-info " data-comments-count="29">
                let pmc =  document.querySelector('.wpd-thread-info');
                //log.debug('initCommentSetupForCachedPage5a');
             if (pmc) {
                //  log.debug('initCommentSetupForCachedPage5b');
                ccnt = pmc.getAttribute('data-comments-count');
                // log.debug('commnencnt: ' + ccnt)
             }
             // log.debug('initCommentSetupForCachedPage6');
              // log.debug(pmb);
               if (ccnt!=='') {
                pmb.innerHTML = pmb.innerHTML + '(' + ccnt +')';
               }
               //pmb[1].setAttribute('href', "/logout");
         }
         
}
*/
function initMembershipSetup() {
    //log.debug('initMembershipSetup');
      let loc =window.location.pathname ;
       //log.debug( loc);
       if ( loc.startsWith('/login') ) {
        //log.debug('try pmpro_actions_nav');
        cnw =  document.querySelector('.pmpro_actions_nav:not(.lost-password)');
        if (cnw) {
            log.debug('in pmpro_actions_nav');
            cnw.style.display = "none";
        // log.debug(cnw);
        }
         
       }
        if ( loc.startsWith('/membership-account/membership-confirmation') ) {
              log.debug('LOOK FOR H2');
            cnw =  document.querySelectorAll('.pmpro_confirmation_wrap > p')[2]
           if (cnw) {
                 log.debug(cnw);
                 let d = document.createElement( 'p' );
                d.id = "username";
         
        d.innerHTML = 'Your default display name is your first and last name. You can change your display name at any time via <a href="/membership-account/your-profile">Edit Profile</a>.' ;
       // log.debug(d);
      //   cnw.appendChild(d);
           cnw.parentNode.insertBefore(d, cnw.nextSibling);
           }
            
        }
 if ( loc.startsWith('/membership') ) {
     //
     
     let sa =  document.querySelector('#shipping_address');
        if (sa) {
            
            sa.setAttribute('placeholder','Name\nStreet\nCity State Zip');
        }
       let sub =  document.querySelector('#subscribe');
         if (sub) {
             // log.debug('initMembershipSetup3');
           sub.checked = true;
            
         }
         
      //log.debug('initMembershipSetup2');
      
      const urlParams = new URLSearchParams(window.location.search);
        const myParam = urlParams.get('level');
        let msg='';
        if (myParam=='2') {
            msg = "Your subscription will be auto-renewed monthly. You may cancel at any time.";
            
        } else  if (myParam=='3') {
            
             msg = "Your subscription will be auto-renewed annually. You may cancel at any time.";
        }
        
         let pmb =  document.querySelector('#pmpro_message_bottom');
         if (pmb) {
             // log.debug('initMembershipSetup3');
             pmb.innerHTML=msg;
            pmb.style.display = "";
         }

        
           let cnw =  document.querySelector('.pmpro_checkout-field-username > label');
         if (cnw) {
     //log.debug('pmpro_checkout-field-username');
             let d = document.createElement( 'span' );
        d.id = "display-name-warning";
         d.cssClass = "old-comment-warning";
        d.innerHTML = ' (displayed publicly with comments posted)' ;
        cnw.appendChild(d);
            
         }
         
           // log.debug('pmpro_account-membership > h2');
           cnw =  document.querySelector('#pmpro_account-membership > h2');
         if (cnw) {
     //log.debug('pmpro_checkout-field-username');
                 log.debug('IN pmpro_account-membership > h2');
              cnw.style.display = "none";
         }
         
         
         //
        //
          cnw = document.querySelector('.pmpro_table th:nth-of-type(3)');
         if (cnw) {
    
                 //log.debug('IN .pmpro_table th:nth-of-type(3)');
                 cnw.style.visibility="hidden";
         }
          cnw = document.querySelector('.pmpro_table td:nth-of-type(3)');
         if (cnw) {
    
                // log.debug('IN .pmpro_table td:nth-of-type(3)');
                 cnw.style.visibility="hidden";
         }
          cnw = document.querySelector('.pmpro_table td:nth-of-type(2)');
          if (cnw) {
    
                // log.debug('IN .pmpro_table td:nth-of-type(2)');
               // log.debug(   cnw.innerHTML)
                let tmp = cnw.innerHTML.replace( 'per Month','').replace( 'per Year','').replace('>.','>');
               // log.debug(   tmp);
                 cnw.innerHTML = tmp;
         }
         //
            cnw =  document.querySelector('#pmpro_actionlink-levels');
         if (cnw) {
      
              cnw.style.display = "none";
         }
         
       
              cnw =  document.querySelector('#pmpro_actionlink-change');
         if (cnw) {
      
               cnw.innerHTML = 'Change Membership';
         }
          let lol =  document.querySelector('#pmpro_actionlink-logout');
         if (lol) {
             lol.setAttribute('href','/logout?redirect_to=' +  encodeURI( '/'));
         }
         //
    }
}

/*function isMemberOrEditor()
{
    
     var memberCookie = getCookie('jmemberlevel');
        
        return (memberCookie=='2' || memberCookie=='3' || memberCookie=='administrator' || memberCookie=='editor' || memberCookie=='contributor') ;
}
*/
function initArticleCommentsSetup() {
    let $loc =window.location.pathname ;
    
    
   
    
    if (!$loc.startsWith('/login') && !$loc.startsWith('/register') && !$loc.startsWith('/user') && !$loc.startsWith('/password')  && !$loc.startsWith('/membership')) {
        //
        // log.debug('initArticleCommentsSetup A');
         const urlParams = new URLSearchParams(window.location.search);
        const myParam = urlParams.get('cli');
           const jmemberlevel = getCookie('jmemberlevel');
        let isCommenterLoggedIn = (myParam=='true' || jmemberlevel=='2' || jmemberlevel=='3');
          //wpd-sbs-toggle
          let lit =  document.querySelector('.wpd-sbs-toggle');
           if (lit) {
                  // log.debug('initArticleCommentsSetup B');
                lit.style.display = "none"; //none
               
           }
          
          let li =  document.querySelector('.wpd-form-wrap');
           if (li) {
                  // log.debug('initArticleCommentsSetup C');
               if (isCommenterLoggedIn) {
                 li.style.display = "";
               } else {
                 li.style.display = "none"; //none
               }
           }
            let lid =  document.querySelector('#comments-login-request');
           if (lid) {
                 if (isCommenterLoggedIn) {
                   lid.style.display = "none"
                 } else  {
               lid.style.display = "block";
                 }
           }
         
            document.cookie = "um_previous_page=" + encodeURI( $loc); 
            
           let l =  document.querySelector('.wpd-login a');
           if (l) {
            l.setAttribute('href',l.getAttribute('href') + '?redirect_to=' +  encodeURI( $loc));
           }
           let c =  document.querySelector('.wpd-login-to-comment');
           if (c) {
               
               if (c.innerText.includes('login')) {
                c.innerHTML = 'Please <a href="/login?redirect_to=' + encodeURI( $loc) + '">LOG IN</a> to comment';
               
               }
              
           
           }
           
           let lo = document.querySelectorAll('.wpd-login > a');
           if (lo) {
                
                 if(lo[0]) {
                  
                    if (lo[0].getAttribute('href','author')) {
                      
                        
                           lo[0].setAttribute('href','/membership-account/?redirect_to=' + encodeURI( $loc) )
                  
                   }
                }
                
                if(lo[1]) {
                  
                    if (lo[1].innerHTML.includes('out')) {
                      //  log.debug('changeit');
                          
                           lo[1].setAttribute('href','/logout?redirect_to=' + encodeURI( $loc) )
                       lo[1].innerHTML = 'Log Out';

                   }
                }
           }
           
    }
    
   if ($loc.startsWith('/membership-')) {
        
    l =  document.querySelector('#pmpro_actionlink-logout');
           if (l) {
            l.setAttribute('href','/logout');
           }
    }
}
function AddTrailingSlash(v) {
    if (v!=null) {
        if (!v.endsWith('/')) {
            v += '/';
        }
    }
    return v;
}
function isTopInView(el) {
    const rect = el.getBoundingClientRect();
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;

    // Check if the top of the element is within the vertical viewport bounds
    return rect.top >= 0 && rect.top <= windowHeight;
}

function setScrollDetails(obj, usePreviousEntry) {
     let tmpId="";
     let correctObject= null;
     
 
     
     
     if (obj.constructor.name == 'IntersectionObserverEntry') {
         correctObject=obj.target;
         tmpId = correctObject.getAttribute("id");
     } else {
          correctObject=obj;
         tmpId = correctObject.getAttribute("id");
     }
     
     lastSectionObserved = correctObject;
     
  
  //console.log(correctObject);
  
 // console.log("tmpId: " + tmpId);
                log.info('Scrolling ALL setScrollDetails: ' + usePreviousEntry);    
   // log.info('Scrolling not instersecting: ' + tmpId);
    if (usePreviousEntry) {
        tmpId= tmpId.replace("-1","-0").replace("-2","-1").replace("-3","-2").replace("-4","-3").replace("-5","-4").replace("-6","-5").replace("-7",-"6");
    }
    //  log.info('Scrolling not instersecting above: ' + tmpId);
     
    let actHere = document.querySelector('#' + tmpId);
     
    let thisUrl = actHere.getAttribute('url')
    history.replaceState(null, null, thisUrl);
     
  
     let title = correctObject.querySelector('article').getAttribute("seo_title");
    
   title=stripHtml (title)    ;         
                       
                       
                        
                        
   // log.info('Scrolling trigger page_view: ' + title);
    thisUrlWithSlash=AddTrailingSlash(thisUrl);
    const url = new URL(thisUrl);
 if (window.scrollY > 0) {
         if ( typeof htlbid !== 'undefined' && htlbid !== null ) {
           if (document.querySelector("#bottom_leaderboard")!==null) {
                htlbid.reloadSlot('bottom_leaderboard');
           }
            if ((document.querySelector("#above_logo")!==null) && document.querySelector("#above_logo").checkVisibility()) {
                htlbid.reloadSlot('above_logo');
            } else {
                 if (document.querySelector("#top_leaderboard")!==null) {
                   htlbid.reloadSlot('top_leaderboard');
                 }
            }
 
                // console.log("htlbid.reloadSlot('middle_rectangle_a');")
                  htlbid.reloadSlot('middle_rectangle_a');
                  htlbid.reloadSlot('middle_rectangle_b');
               //     console.log("htlbid.reloadSlot('middle_rectangle_b');")
       }

    gtag('event', 'page_view', {
      page_title: title,
      page_location: thisUrlWithSlash,
     // page_path: url.pathname
    });
 }
    if ( typeof pSUPERFLY !== 'undefined' && pSUPERFLY !== null ) {
         
        if (window.scrollY> 0) {
        let a = document.querySelector("#" + correctObject.getAttribute("id")  +  " .bylinepublished a").innerText ;
        if ( typeof a === 'undefined' && a === null ) {
               a="";
        }
        let s = document.querySelector("#" + correctObject.getAttribute("id")  + " .header .type a").innerText;
        if ( typeof s === 'undefined' && s === null ) {
               s="";
        }
     
        
       // console.log("author: " + a);
       // console.log("section: " + s);
      //  console.log("path: " + url.pathname);
      //  console.log("title: " + title);
        pSUPERFLY.virtualPage({
          sections: s,
          authors: a,
          path: url.pathname,
          title: title
        }); 
        }
    }
   // currentIntersectionEntry=entryToActOn;
}

var lastSectionObserved = null;

if (doScroll) {
document.addEventListener("DOMContentLoaded", () => {
     //scrollTracker
     //lastAdRefresh: null,lastPaveViewRecorded: null
    log.setDefaultLevel(log.levels.TRACE, true);
    //log.debug('log.getLevel(): ' + log.getLevel());
    log.setLevel('silent', true)
   // log.debug('log.getLevel(): ' + log.getLevel());
 
    if (true || (document.getElementsByClassName('postid-1825910190') !== null && document.getElementsByClassName('postid-1825910190').length>0))
    {
         let div0 = document.querySelector('div[id="scroll-section-0"]');
        if (div0!==null) {
         origUrl = div0.getAttribute("url");
        }
        
         let sectionsScroll = document.querySelectorAll('div[id^="scroll-section-"]');
                    
                     
                       sectionsScroll.forEach(p => {
                           
                            p.classList.remove('hide');
              
                       });
                      
                    
          
      log.info('section0');
        let section0 = document.querySelector('div[id^="scroll-section-0"]'); 
        if (section0!=null) {
            let postId=section0.getAttribute("post_id");
            let url=section0.getAttribute("url");
            
           
             log.info(postId);
              log.info(url);
            getCommentCount(section0,url,postId);
        }
      //  log.debug('postid-1825910190 HERE WE GO');
        
        const observerOptions = {
            root: null, // observe intersections with the viewport
            rootMargin: '0px',
            threshold: 0.1 //0.5 // trigger when 50% of the section is visible
        };
    
        observer = new IntersectionObserver((entries, observer) => {
   
            prevEntry=null;
            bottomOfPreviousSection=0
            let stopLoop=false;
            
            let isIntersectionFound=false;
            entries.forEach(entry => {
                lastObserverTriggered=entry;
              //   console.log('IO: ' + entry.target.getAttribute("id"));
             //    console.log('IO: ' + entry.isIntersecting);
             //    console.log( entry.target);
                 //if(currentIntersectionEntry!=null) {
                // log.info('Scrolling all current: ' + currentIntersectionEntry.target.getAttribute("id"));
               //  } else {
                    // log.info('Scrolling all current: ' +  'null');
                // }
                
                if (prevEntry == null) {
                    prevEntry = entry;
                }
                    let entryToActOn=entry;
                 
           
                if (entryToActOn.isIntersecting) {
                    isIntersectionFound=true;
                    currentIntersectionEntry=entryToActOn;
                    log.info('Scrolling all isIntersecting: ' + entry.target.getAttribute("id"));
                    
                  
                    let lastIntersectionsId=0;
                    if (lastIntersection == null ) {
                        lastIntersectionsId=document.querySelector("#scroll-section-0").getAttribute('id');
                    } else {
                     
                        lastIntersectionsId= lastIntersection.target.getAttribute('id');
                    }
                    
                   
                    
                    log.info('Scrolling lastIntersectionsId: ' + lastIntersectionsId);
                     
                     
                    let isCurrentSectionInView =  isTopInView(entryToActOn.target);
                 

                    const iId = entryToActOn.target.getAttribute('id');
                 
                    let  thisPostId = entryToActOn.target.getAttribute('post_id');
            


                    let sectionsToChange = document.querySelectorAll('div[id^="scroll-section-"]');
                    
                     
                    sectionsToChange.forEach(p => {
                           
                        let postId=p.getAttribute("post_id");
                            
                           let mp =   p.querySelector('#disqus-comment-count-wrapper')
                        if(mp!=null) {
                            mp.classList.remove("hide");
      
                        }
                    
              
                    });
                      
                    
                    
                   setScrollDetails(entryToActOn, false);
                   
                    isFirstObserverTriggered=true;
                   
                    
                    lastIntersection=entry;
                    stopLoop=true;
                    
                  // log.info("Scrolling: i want to break");
                } else {
                    // not intesecting
                    
                    
                        
                         // log.info('Scrolling all maybe skip: ' + entry.target.getAttribute("id"));
                       //   log.info('Scrolling all maybe skip:' + currentIntersectionEntry.target.getAttribute("id"));
              
                   // if(entry.target.getAttribute("id") == "scroll-section-0" && currentIntersectionEntry.target.getAttribute("id") == "scroll-section-1")  { 
                       //  log.info('Scrolling all  skip: ' + 'adjustment');
                   // } else {
                    //setScrollDetails(entryToActOn, true);
                    //}
                   
                }
                 prevEntry=entry;
              
             
            });
             if (!isIntersectionFound) {
                 let isSectionFound = false;
                 
                 // console.log("IO: No Interection" );
               
                  
                  document.querySelectorAll('div[id^="scroll-section-"]').forEach(element => {
                         if (!isSectionFound) {
                           if (isElementPartiallyInViewport(element)) {
                              // console.log("set url");
                               setScrollDetails(element, false);
                               
                           isSectionFound=true;
                                  
                           }
                         }
                    });
                                      
                
                  
                    
              }
            
        }, observerOptions);
    
        setStickyAside();
    
        let sections = document.querySelectorAll('div[id^="scroll-section-"]');
    
        var loadCnt=0;
        
        sections.forEach(p => {
           
           
           
              
                                 
                          
                             
           
           
            if ( p.getAttribute('id') != 'scroll-section-0') {
                
                 let url = p.getAttribute('url') ; //'https://www.avclub.com/john-waters-christmas-interview-2025';
                 let postId = p.getAttribute('post_id') ;
              
                let xhr = new XMLHttpRequest();
               
                
                      //   let postId=p.getAttribute("post_id");
                   //  log.debug('get : ' + url);
                   //  log.debug(p);
                xhr.open('GET', url, true); // true for asynchronous operation
                
                xhr.onreadystatechange = function () {
                  
                    if (xhr.readyState === 4 && xhr.status === 200) {
                   
                        let data =  xhr.responseText;
                        //log.debug(data);
                        const parser = new DOMParser();
                    
        
                        const doc = parser.parseFromString(data, "text/html");
                       // log.debug(doc.body.querySelector("h1").textContent)
                        //log.debug(doc.body.querySelector("article"))
                       p.innerHTML=doc.body.querySelector("article").outerHTML;
                       
                         let dts = p.querySelector("[id^='disqus_thread']");
                                  //   log.debug('dts');
                                 //  log.debug(dts);
                                    dts.setAttribute('id','disqus_thread_' + p.getAttribute("post_id"));
     
                        let numbers = p.id.replace(/\D/g, '');
                       
                        p.querySelectorAll('div[id^="mid_leaderboard_rectangle_"]').forEach(d => {
                                //log.debug("Add x_"+numbers);
                               // log.debug(d); 
                                p.removeAttribute("data-ad-processed");
                                //if(!d.id.startsWith("x_")) {
                                    //d.id=("id","x_" + numbers + "_" + d.getAttribute("id"));
                                   // d.id=d.id.replace('_rectangle_','_rectangle_' + postId +'_')
                                    d.id=d.id + '_' + postId
                                   // log.debug(d);log.debug("Add x_ done");
                                   //  d.setAttribute("class",  d.getAttribute("class").replace('_rectangle_','_rectangle_' + postId +'_'));
                               // }
                            });
                
                        let aurl= p.getAttribute('url');
                         log.debug ('insta aurl: ' +aurl );
                         
                         p.querySelectorAll("blockquote[class='instagram-media']").forEach((item, index) => {
                            log.debug ('insta: blockquotex' );
                            log.debug(item);
                            let  iUrl= item.getAttribute('data-instgrm-permalink');
                            log.debug ('insta: ' + iUrl);
                              const r = /(reel|p)\/([^\/]*)/;
                            const match = iUrl.match(r);
                                //   preg_match('/\/p\/([^\/]*)\//si', iUrl, $output_array);
                                    if ( match!=null && match.length==3) {
                                      log.debug ('insta: ' + match[2]);
                                      const rnd = Math.floor(Math.random() * 9999999);
                                      const rframe='<iframe class="instagram-media instagram-media-rendered" id="instagram-embed-' + rnd + '" src="https://www.instagram.com/p/' + match[2] + '/embed/" allowtransparency="true" allowfullscreen="true" frameborder="0" height="674" data-instgrm-payload-id="instagram-media-payload-0" scrolling="no" style="background: white; max-width: 540px; width: calc(100% - 2px); border-radius: 3px; border: 1px solid rgb(219, 219, 219); box-shadow: none; display: block; margin: 0px 0px 12px; min-width: 326px; padding: 0px;position:relavtive"></iframe>';
                                      
                                       item.outerHTML=rframe;
                                    }
                                });
                                                      
                        loadCnt++;
                 
                        if(loadCnt===scrollSectionsToAddCount) {
                         
                           
                            
                            
                          let newSections = document.querySelectorAll('div[id^="scroll-section-"]');
                           
                        
                   
             
                            newSections.forEach(section => {
                                
                                   postId=section.getAttribute("post_id");
                                  url=section.getAttribute("url");
 
                                 //observer.observe(section);
                                  
                               
                             
     
                                getCommentCount(section,url,postId);
                                 let dt =  section.querySelector('div[id^="disqus_thread"]') 
                                if (dt!=null) {
                                    dt.setAttribute("id","disqus_thread_" + section.getAttribute("post_id"));
                                    dt.innerHTML='';
                                }
                                
                                let asm  = document.querySelector('#article-share-button[post_id="' + postId + '"]');
                                    asm.addEventListener('click', function(event) {
                                          log.debug('Element clicked!');
                                          let pid = event.target.getAttribute("post_id");
                                           log.debug('post_id' + pid);
                                          let smp  = document.querySelector('#article-share-button[post_id="' + pid + '"]').parentElement;
                                          let sm = smp.querySelector('#article-share-menu');
                                          
                                       //  let sm = $('#article-share-menu');
                                          if (sm!==null) {
                                               if (sm.classList.contains("is-open")) {
                                         
                                              
                                            
                                                   sm.classList.remove("is-open")
                                                      sm.setAttribute("aria-hidden", true);
                                                //  sm.addClass("hide");
                                                    sm.classList.add("hide")
                                                } else {
                                                    
                                                     sm.classList.add("is-open")
                                                      sm.setAttribute("aria-hidden", false);
                                                //  sm.addClass("hide");
                                                    sm.classList.remove("hide")
                                                }
                                          } else {
                                              //  sm.removeClass("is-open");
                                               // sm.attr("aria-hidden", true);
                                               // sm.addClass("hide");
                                            }
                                  
                            	});
                               // resizeObserver.observe(dt);
                            

                           });
                          
                           positionRightRailAds(0);
                           
                           
                             let lastMore =  document.querySelector("#scroll-section-" + scrollSectionsToAddCount + " .scroll-more")
                           if (lastMore!=null) {
                               lastMore.innerHTML='';
                           }
                              let newObSections = document.querySelectorAll('div[id^="scroll-section-"]');
                            
                             newObSections.forEach(section => {
                                                   log.debug('initial observe', section);       
                                               
                                                      observer.observe(section);
                            });
    
    populateBlueskyEmbeds();
    populateTwitterEmbeds();
                                   /* tmr = setTimeout(function () {
                
                                    let dts =  document.querySelectorAll('div[id^="disqus_thread"]').forEach((item, index) => { 
                                     
                                       log.debug("add resizeObserver");
                                        
                                         resizeObserver.observe(item);
                                    });
                                    }, 5000);
                                    */
         

                       
                         /*
                         document.querySelectorAll('div[id^="disqus_thread"]').forEach(d => {
                                //log.debug("Add x_"+numbers);
                               log.debug('set disqusid: ' + "disqus_thread_" + d.parentNode.getAttribute("post_id")); 
                               log.debug(d);
                                d.setAttribute("id","disqus_thread_" + d.parentNode.getAttribute("post_id"));
                                d.innerHTML='';
                                
                            });
                         */
                         
                         /************************************/
                          let $goToCommentsButton =  jQuery('.comment-count-go-to');
   
    // log.debug('add comment click handlers');o
    
    if ($goToCommentsButton.length>0) {
   
        $goToCommentsButton.each(function(index, element) {
  
         //   log.debug('add comment click handler');
          //  log.debug(  $goToCommentsButton[index]);
             jQuery(element).on('click', function(event) {
                event.preventDefault();
                $clickedObj = jQuery(this);
               // log.debug('parent');
                 $clickedPostId= $clickedObj.attr("post_id")
                    log.debug('$clickedPostId: ' + $clickedPostId);
                let myQ='.scroll-article-container[post_id="' + $clickedPostId + '"] #disqus-comment-count-wrapper';
               
                let  $xclick = document.querySelector(myQ);
                   
                
                 showCommentsForScroll( $xclick,$clickedPostId);
                 
                 
                $ss= $clickedObj.parentsUntil('div.scroll-article-container')
             //   log.debug('parent ss');
             //   log.debug($ss.parent('div'));
                 
                $sectionScrollElement = $ss.parent('div');
                $sid = $sectionScrollElement.attr('id');
              //  log.debug( $sid);
                
                jQuery( $sid +" .sbn-read-more-unlock-btn.rc-read-more-unlock-btn").trigger("click");
                 // log.debug('$goToCommentsButtonClick');
                   
                let $showCommentsButtonWrapper =  jQuery('#' + $sid + ' #disqus-comment-count-wrapper'); 
               
                    jQuery('#' + $sid +" .sbn-read-more-unlock-btn.rc-read-more-unlock-btn").trigger("click");
                var container = jQuery('#' + $sid + ' #comment-marker');

                jQuery('html, body').animate({
                      scrollTop: container.offset().top - 200
                    },0);
                  
      
                   $showCommentsButtonWrapper.css({ display: "none" });
                     jQuery('.wp-block-comments').removeClass("hide");
                   
               } ); //end animate
    
            }); //end click
    } //end for loop
                         /************************************/
                            
                      }
                  } else if (xhr.readyState === 4) {
                    
                    console.error('An error occurred:', xhr.statusText);
                  }
                };
                
                xhr.send();  
            }
        });
    
       
    

 
  

    
    // Optional: Handle the case when the user scrolls back to the very top (remove the hash)
   /* window.addEventListener('scroll', () => {
        if (window.scrollY === 0) {
            history.replaceState(null, null,origUrl); // window.location.pathname
        }
    });
   */
}
 
 /*
        if (window.innerWidth<1024 && doScroll) {
            document.querySelector('.htlad-middle_rectangle').style.display = "none";
                 document.querySelector('.htlad-top_rectangle').style.display = "none";
        
        }
 */


 log.debug('attempt findhighlight');
let tmpx = jQuery('b.type a')
if (tmpx.length>0) {
     let tmph = tmpx[0].text;
     if (tmph.length>0) {
            let tmpo = jQuery('.bottom-link-row.horizontal a:contains(' + tmph + ')');
             if (tmpo.length>0) {
                tmpo.addClass('active')
                log.debug('findhighlight');
                log.debug(tmpo);
             }
     }
}
 log.trace("before remove ads");
 
if (isMemberOrEditor()) {
    
  
    
    
    
        log.trace("remove ads");
 
            jQuery('#top_leaderboard').remove();
             jQuery('head img').remove();
        jQuery("[class^=htlad]").remove(); //css("display", "none");
        jQuery(".dfp").remove(); //.css("display", "none");
          jQuery("#master-header").css("margin-top", "0");
          jQuery("#block-19 p").remove(); //.css("display", "none !important");
        jQuery("#block-8 p").remove(); //.css("display", "none !important");
    //  let taboola = jQuery("#taboola-below-article-feed");
     // if(taboola) {
          //log.debug('taboola-below-article-feed');
     //       taboola.html("");
       //     taboola.remove(); //.css("display", "none !important");
      }
     // taboola = jQuery("#taboola-below-home-page-feed");
     // if(taboola) {
          //log.debug('taboola-below-home-page-feed');
      //      taboola.html("");
     //       taboola.remove(); //.css("display", "none !important");
     // }
     
     // taboola = jQuery("#taboola-below-section-front-feed");
     // if(taboola) {
        //  log.debug('taboola-below-section-front-feed');
          //  taboola.html("");
            //taboola.remove(); //.css("display", "none !important");
     // }
        //log.debug ('SUPPRESS ADS DONE');
        
    

   log.debug('getIsRestrictedContent');
  //initArticleCommentsSetup();
  if( getIsRestrictedContent() && ! getIsAccessToRestrictedContentAllowed()) {
      let el = jQuery( '.copy.entry' );
     // log.debug(el);
       // log.debug(el.children('p').first().prop('outerHTML'));
        let el2 =  el.children('p').eq(1);
         let p2 = '';
       if(el2) {
        el2.attr("class","blur");
        //let ih = el2.prop('innerHTML')

       //el2.prop('outerHTML')
       p2= el2.prop('outerHTML')
       }
       // log.debug(el.firstChild.innerHTML);
        if (el) {
            let loc =window.location.pathname
            //log.debug("remove content")


         el.html(el.children('p').first().prop('outerHTML') + p2 + '<div class="login-content"><div class="restricted-warning"><p class="heading">This content is available to subscribers only<p><p>Welcome to Jezebel! Help support our cause and get access to our subscriber-only content. You\'ll also get invited to our private Discord channel, access to our our monthly Jezebel book club, and a chance to win limited-edition Jezebel merch from artists we love.</p><div class="wide-group"><div class="group"><p class="subhead group">Monthly</p><p class="group  bullet">FREE Jezebel T-shirt</p><p class="group  bullet">Exclusive Content</p><p class="group  bullet">Comment on Articles</p> <p class="group  bullet"><span style=" text-decoration: line-through;">$8</span> $5/month</p></div><div class="group bullet"><p class="subhead group">Annual</p><p class="group  bullet">Get a T-Shirt &amp; Tote Bag</p><p class="group  bullet">Exclusive Content</p><p class="group  bullet">Comment on Articles</p><p class="group  bullet"><span style=" text-decoration: line-through;">$80</span> $50/year</p><p class="group">&nbsp;</p> </div></div><div class="wide-group buttons"><div class="group"><div class="spacer"><div class="button"><a href="/membership-account/membership-checkout?level=2">Subscribe</a></div></div> </div></div><div class="group"><div class="spacer"><div class="button"><a href="/membership-account/membership-checkout?level=3">Subscribe</a></div></div></div><hr><div class="wide-group buttons"><div class="group"><div class="spacer"><div class="button"><a href="/login?redirect_to=' + encodeURIComponent(loc) + '">Log In</a></div></div> </div></div>');

        }
        el = jQuery( '#comments' ); 
       // log.debug(el);
        if (el) {
            log.debug("remove comments")
            el.html('');


        }

        //''
         el = jQuery( '.grid-x.article-shares-links.four' ); 
      //  log.debug(el);
        if (el) {
         //   log.debug("remove shares")
            el.html('');


        }
 }
  initMembershipSetup();

$bntrm=	jQuery(".sbn-read-more-unlock-btn.rc-read-more-unlock-btn");
	if($bntrm.length>0) {
	
	         $bntrm.attr('style','background:#a90026;font-family:Tahoma, sans-serif !important;width:100%;font-size:18px;');
	}

});
} else {
    
    
    
}
    
    
//document.addEventListener("DOMContentLoaded", () => {


//log.debug('Suppress Ads???');
 
 //

//});
 

/////////////////}



    
   

jQuery(function ($) {
   /**
    * MOBILE NAV
    */
   // log.debug('MOBILE NAV');
    
   /* $(document).on('click', function(event) {
        
	    if($(event.target).attr('id') != '32rdph-dd-anchor' && !$(event.target).hasClass('icon-menu')) {
	        log.debug('click NOT 32rdph-dd-anchor');
	        $('.top-bar-right > .menu').removeClass("hover");
             $('.top-bar-right > .menu').attr("aria-expanded", false);
             $("#small-navigation-menu")
                .removeClass("is-open")
                .attr("aria-hidden", true);
	    } else {
	          log.debug('click IS 32rdph-dd-anchor');
	        
	    }

	}); */
	
   $(document).on('click', function(event) {
       log.debug('document.click');
   log.debug(event.target.id);
       //article-share-button
        if (isOkToCloseMenu(event)) {
             log.debug('close it');
	        if($(event.target).attr('id') != '32rdph-dd-anchor' && !$(event.target).hasClass('icon-menu')) {
	        $('.top-bar-right > .menu').removeClass("hover");
            $('.top-bar-right > .menu').attr("aria-expanded", false);
            $("#small-navigation-menu")
               .removeClass("is-open")
               .attr("aria-hidden", true);
	        }
        }  
        
          let sm = $('#article-share-menu');
      if (sm) {
        if (sm.hasClass("is-open")) {
                if(event.target.id != 'article-share-button') {
                   sm.removeClass("is-open");
                      sm.attr("aria-hidden", true);
                  sm.addClass("hide");
                }
        } else {
       
        }
      } 
   });
    $(document).on("click", ".top-bar-right > .menu", function () {
        log.debug('click mm');
      if (!$(this).hasClass("hover")) {
         $(this).addClass("hover");
         $(this).attr("aria-expanded", true);
         $("#small-navigation-menu")
            .addClass("is-open")
            .attr("aria-hidden", false);
      } else {
            if (isOkToCloseMenu(event)) {
                 $(this).removeClass("hover");
                 $(this).attr("aria-expanded", false);
                $("#small-navigation-menu")
                    .removeClass("is-open")
                   .attr("aria-hidden", true);
            }
      }
   });



   
       
    
      
	//});
	
	
	
	
	
	
		$(document).on("click", "#share-link-copy", function (event) {
            event.preventDefault();
    
    
     
     
        // console.log(event.target.getAttribute('href'));
            navigator.clipboard.writeText(event.target.getAttribute('href'));
        //  c.click();
        event.target.parentNode.parentNode.classList.add('hide');
        //  c.classList.add('hide');
        //	$('.close-button').trigger('click');
});



 $(document).on("click", "#article-share-button", function () {
      // log.debug('share click');
          event.preventDefault();
           let sm = $('#article-share-menu');
      if (sm.hasClass("hide")) {
    //    $(this).addClass("hover");
      //   $(this).attr("aria-expanded", true);
         
            sm.addClass("is-open");
            sm.attr("aria-hidden", false);
           sm .removeClass("hide");
      } else {
           // if (isOkToCloseMenu(event)) {
        // $(this).removeClass("hover");
        // $(this).attr("aria-expanded", false);
     // $("#article-share-menu")
         //   .removeClass("is-open")
         //    .addClass("hide")
          // .attr("aria-hidden", true);
    //  }
      }
   });
 
   
   
   /*
    $(document).on("click", ".top-bar-right > .menu", function () {
      if (!$(this).hasClass("hover")) {
         $(this).addClass("hover");
         $(this).attr("aria-expanded", true);
         $("#small-navigation-menu")
            .addClass("is-open")
            .attr("aria-hidden", false);
      } else {
            if (isOkToCloseMenu(event)) {
         $(this).removeClass("hover");
         $(this).attr("aria-expanded", false);
      $("#small-navigation-menu")
            .removeClass("is-open")
           .attr("aria-hidden", true);
      }
      }
   });
   
	*/
	
	 let u = new URL(window.location);
    u.hash = '';
    u.search = '';
   
	
	let loc = encodeURIComponent(u.toString());
   
    
 
  jQuery.ajax({
  type: 'get',url: 'https://disqus.com/api/3.0/threads/details.json?api_key=mZyGvuGCJddMuwBLSBOrVIYboExFoMNur40ypGj1ZCMFOSKsXDbi17RhenUYeBDV&callback=foo&forum=jezebel-1&thread=link:' + loc ,
  success: function (data) {
      //jdata=JSON.parse(data);
 
    let r = data.match(/\"posts\":(\d+)/);
 
       
        let t1 = $('.disqus-comment-count span.text');
        if (t1) {
       t1.html(r[1]);
        }
        let t  =  $('#show-comment-block')
        if (t) {
            if (r[1] === '0' || r[1] === '' ) {
                 t.html('Start the discussion...');
            } else  if (r[1] == '1'  ) { 
                 t.html('Continue the discussion...');
            } else    { 
             t.html('Show all ' + r[1] + ' comments...');
            }
        }
        
     
   
  },
    error: function (request, status, error) {
        log.debug(error);
    }
  
}); 
	
	   
   let $showCommentsButton =  $('#show-comments-button');
 
   let $showCommentsButtonWrapper =  $('#disqus-comment-count-wrapper'); 
  if ($showCommentsButtonWrapper) {
   
       
        
           $($showCommentsButtonWrapper).on('click', function(event) {
                //event.preventDefault();
               
 
              $showCommentsButtonWrapper.css({ display: "none" });
               
                 $('.wp-block-comments').removeClass("hide");
           } );
       
   }
   
  
    let $goToCommentsButton =  $('.comment-count-go-to');
    if ($goToCommentsButton) {
   
     
        
           $($goToCommentsButton).on('click', function(event) {
                event.preventDefault();
                 $(".sbn-read-more-unlock-btn.rc-read-more-unlock-btn").trigger("click");
                 // log.debug('$goToCommentsButtonClick');
                   
                    let $showCommentsButtonWrapper =  $('#disqus-comment-count-wrapper'); 
               
                   
                var container = $('#comment-marker');

            $('html, body').animate({
                  scrollTop: container.offset().top
                },0);
              
  
               $showCommentsButtonWrapper.css({ display: "none" });
                 $('.wp-block-comments').removeClass("hide");
               
           } );
       
   }
    
	
   /**
    * STICKY AD
    */
    /*
        $(window).on("scroll resize",function(e){
        
         
         $t = $('#taboola-below-article-feed');
         if ($t.length === 0) {
             
              
            $t = $('#taboola-below-section-front-feed');
                   //taboola-below-section-front-feed
              if ($t.length === 0) {
             
              
                $t = $('#taboola-below-home-page-feed');
            }  
         } 
         
         
         
         if($t.length !== 0) {
            let elementTop = $t.offset().top;
            let elementBottom = elementTop + $t.outerHeight();
            let viewportTop = $(window).scrollTop();
            let viewportBottom = viewportTop + $(window).height();
            if ( elementBottom > viewportTop && elementTop < + viewportBottom) {
                $('#bottom-fixed-unit').hide();
                
            } else  {
                  $('#bottom-fixed-unit').show();
                
            }
         }
   
}); */


    /*
    $(window).on("resize scroll",function(e){
   //   log.debug($(this).width())
     if( $(this).width() >= 1024) {
  var $el = $('.pm-sticky'); 
  var isPositionFixed = ($el.css('position') == 'fixed');
  if ($(this).scrollTop() > 3860 && !isPositionFixed){ 
    $el.css({'position': 'fixed', 'top': '138px'}); 
  }
  if ($(this).scrollTop() < 3860 && isPositionFixed){
    $el.css({'position': 'static', 'top': '0px'}); 
  } 
     }
});
*/
   /**
    * AJAX SEARCH
    */

   if ($("#master-search").length) {
      function prodFrontendSearch(inputSelector, listSelector) {
         var q = inputSelector.val();

         if (q.length > 2 /* || q !== "undefined" */) {
            $("#search_in_progress").addClass("active");

            $.ajax({
               url: ajaxurl,
               method: "POST",
               data: {
                  action: "pm_article_search",
                  q: q,
               },
               error: function (jqXHR, textStatus, errorThrown) {
                  console.error("SEARCH AJAX ERROR: " + errorThrown);
               },
            }).done(function (response) {
               if (response.success === true) {
                 
                  listSelector
                     .html(response.data.search_results)
                     .css("width", $("#article-search").outerWidth());

                  
                  $("#search_in_progress").removeClass("active");
                 
               } else {
                  
               }
            });
         } else {
            $("#search_results_list").html("");
          
            listSelector.removeAttr("style");
         }
      }

      //prodFrontendSearch($("#master-search"), $("#search_results_list"));

      $(document).on("click", "#search_results_list li", function () {
         window.location = $(this).data("href");
      });

      /** Search input field listener **/

      var TimerS;

      $("#master-search").on("keypress keyup focus", function (e) {
         if (e.which == 13) {
            let q = $("#master-search").val();
            e.preventDefault();

            if (q.length > 0) {
               window.location.href = "/search?q=" + q;
            } else {
               window.location.href = "/search";
            }
         }

         clearTimeout(TimerS);
         TimerS = setTimeout(function () {
            //prodFrontendSearch($("#master-search"), $("#search_results_list"));
         }, 500);
      });

      const queryString = window.location.search;
      const urlParams = new URLSearchParams(queryString);

      if (queryString !== "") {
         $("#master-search").val($.trim(urlParams.get("q")));
      }
      //});

      $(document).click(function (event) {
         if (
            $(event.target) !== $("#search_results_list") &&
            $(event.target).closest("#search_results_list").length <= 0
         ) {
            
            $("#search_results_list").html("").removeAttr("style");
            
         }

         
      });
   }

   /**
    *  MUSIC PLAYER
    * */

   $.fn.extend({
      uniqueId: (function () {
         var e = 0;
         return function () {
            return this.each(function () {
               this.id || (this.id = "ui-id-" + ++e);
            });
         };
      })(),
      removeUniqueId: function () {
         return this.each(function () {
            /^ui-id-\d+$/.test(this.id) && e(this).removeAttr("id");
         });
      },
   });

   function unicodeToString(unicodeString) {
      return unicodeString;
      
      let decoded = decodeURIComponent(JSON.parse('["' + unicodeString + '"]'));
   
      return decoded;
   }

   

  
  
   /**
    * SOCIAL SHARE
    */
/*
if ($("#article-share-menu")) {
      const t = $("#article-share-menu");
      t.find(".icon-facebook").on("click", function (e) {
         e.preventDefault(),
            window.open(
               "https://www.facebook.com/sharer/sharer.php?u=" +
                  encodeURIComponent(this.href),
               "fb-share",
               "status=0,toolbar=0,location=1,width=700,height=400"
            );
      }),
         t.find(".icon-twitter").on("click", function (e) {
            e.preventDefault();
            const t = $(this),
               n = $("<div>" + t.data("title") + "</div>").text();
            window.open(
               "https://twitter.com/intent/tweet?via=jezebel&related=jezebel&url=" +
                  encodeURIComponent(this.href) +
                  "&text=" +
                  encodeURI(n).replace("&", "%26"),
               "tw-share",
               "status=0,toolbar=0,location=1,width=700,height=250"
            );
         }),
         t.find(".icon-reddit-alien").on("click", function (e) {
            e.preventDefault();
            const t = $(this),
               n = $("<div>" + t.data("title") + "</div>").text();
            window.open(
               "https://www.reddit.com/submit?title=" +
                  n +
                  "&url=" +
                  encodeURIComponent(this.href),
               "reddit-share","status=0,toolbar=0,location=1,width=700,height=400"
            );
         }),
         t.find(".icon-pinterest").on("click", function (e) {
            e.preventDefault();
            const t = $(this),
               n = t.data("image"),
               i = $("<div>" + t.data("title") + "</div>").text();
            window.open(
               "https://pinterest.com/pin/create/button/?url=" +
                  encodeURIComponent(this.href) +
                  "&media=" +
                  n +
                  "&description=" +
                  encodeURI(i).replace("&", "%26"),
               "pi-share",
               "status=0,toolbar=0,location=1,width=700,height=250"
            );
         }),
         t.find(".google-plus").on("click", function (e) {
            e.preventDefault();
            $(this);
            window.open(
               "https://plus.google.com/share?url=" +
                  encodeURIComponent(this.href),
               "google-share",
               "menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600"
            );
         }),
         t.find(".linked-in").on("click", function (e) {
            e.preventDefault();
            const t = $(this),
               n = $("<div>" + t.data("title") + "</div>").text();
            window.open(
               "https://www.linkedin.com/shareArticle?mini=true&url=" +
                  encodeURIComponent(this.href) +
                  "&title=" +
                  encodeURI(n).replace("&", "%26"),
               "linkedin-share",
               "menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=570,width=520"
            );
         }),
         t.find(".tumblr").on("click", function (e) {
            e.preventDefault();
            const t = $(this),
               n = $("<div>" + t.data("title") + "</div>").text(),
               i = $(
                  "<div>" +
                     $("meta[name='description']").attr("content") +
                     "</div>"
               ).text();
            window.open(
               "http://tumblr.com/widgets/share/tool?canonicalUrl=" +
                  encodeURIComponent(this.href) +
                  "&posttype=link&content=" +
                  encodeURIComponent(t.data("href")) +
                  "&title=" +
                  encodeURI(n).replace("&", "%26") +
                  "&caption=" +
                  encodeURI(i).replace("&", "%26"),
               "tumblr-share",
               "menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=540"
            );
         }),
           t.find(".icon-email").on("click", function (e) {
            e.preventDefault(),
           log.debug(  t.find(".icon-email a").attr('href'));
           window.location.href =  t.find(".icon-email a").attr('href');
         
              
         }),
         t.find(".stumble-upon").on("click", function (e) {
            e.preventDefault(),
               window.open(
                  "http://www.stumbleupon.com/submit?url=" +
                     encodeURIComponent(this.href),
                  "stumble-share",
                  "menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=400,width=800"
               );
         }),
         t.find(".icon-comment").on("click", function (e) {
            e.preventDefault();
            const t = $(this),
               n = t.data("title"),
               i = this.href,
               o = (function () {
                  const e = navigator.userAgent.toLowerCase();
                  var t = [];
                  if (/iP(hone|od|ad)/.test(navigator.platform)) {
                     const e = navigator.appVersion.match(
                        /OS (\d+)_(\d+)_?(\d+)?/
                     );
                     t = [
                        parseInt(e[1], 10),
                        parseInt(e[2], 10),
                        parseInt(e[3] || 0, 10),
                     ];
                  }
                  var n = "sms:";
                  return (
                     (n +=
                        t.length > 0 && t[0] > 7
                           ? "&"
                           : e.indexOf("iphone") > -1 || e.indexOf("ipad") > -1
                           ? ";"
                           : "?"),
                     (n += "body=")
                  );
               })(),
               r = function (e) {
                  return {
                     "&#8220;": '"',
                     "&#8221;": '"',
                     "&#160;": " ",
                     "&#8217;": "'",
                     "&#8212;": "-",
                     "&#133;": "...",
                     "&#39;": "'",
                     "&#8216;": "'",
                     "&#8230;": "...",
                     "&#233;": "E",
                     "&#8211;": "-",
                     "&#246;": "O",
                     "&#42;": "*",
                  }[e];
               },
               s =
                  o +
                  encodeURIComponent(n.replace(/\&#[0-9]+;/g, r)) +
                  "%0A%0D" +
                  encodeURIComponent(i);
            window.open(s, "_self");
         });
   }
  */
});



//});



 var $xjQuery = jQuery.noConflict();
/*
jQuery(document).ready(function ($) {
    // Your code here
    retryEmptyAdSlots(7000,1);
    retryEmptyAdSlots(7000+5000,2); 
     retryEmptyAdSlots(7000+5000+5000,3);
    });
    */
    
function retryEmptyAdSlots(msDelay, tryNumber) {
   // log.debug('Queue retryEmptyAdSlots(): ' + tryNumber);
   /*   const myTimeout = setTimeout(function() { 
      
       $xjQuery('div[class^=htlad-]').each(function( index ) {
            if ( $xjQuery( this ).is(":visible") ) {
            //log.debug( index + ": " + $xjQuery( this ).text() );
              let myid = $xjQuery(this).attr('id');
             
              
            if ($xjQuery( this ).contents().find("iframe").attr('id') ) {
            } else {
              
                 htlbid.refreshSlot(myid);
               // htlbid.refreshSlot(myid);
            } 
            }
        });
   }
     , msDelay);
     */
}

function isOkToCloseMenu(event) {
    let $closeIt = true;
     let $b =document.getElementById('master-search').getBoundingClientRect();
            log.debug($b)
            if ($b && event.clientX > $b.x-20  && event.clientX < $b.width + $b.x +20) {
                 if ( event.clientY > $b.y -20  && event.clientY  < $b.height + $b.y +20)
                 {
                 log.debug('ignore click');
                $closeIt = false;
                }
                
            }
    return $closeIt;
}
  
  
  function updateToolTip(msg) {
  //var copyText = document.getElementById("myInput");
 // copyText.select();
 // copyText.setSelectionRange(0, 99999);
 // navigator.clipboard.writeText(copyText.value);
  
  var tooltip = document.getElementById("myTooltip");
  tooltip.innerHTML = msg; 
}

function showToolTip(msg) {
  var tooltip = document.getElementById("myTooltip");
  tooltip.innerHTML = msg; 
  tooltip.style.visibility='visible';
    tooltip.style.opacity='1';
 
  
	var fadeEffect = setInterval(function () {
        if (!tooltip.style.opacity) {
            tooltip.style.opacity = 1;
        }
        if (tooltip.style.opacity > 0) {
            tooltip.style.opacity -= 0.1;
        } else {
            clearInterval(fadeEffect);
              tooltip.style.visibility='hidden';
        }
    }, 300);
 
  
}



/*function isElementPartiallyInViewport(el) {
  const rect = el.getBoundingClientRect();
  const windowHeight = (window.innerHeight || document.documentElement.clientHeight);
  const windowWidth = (window.innerWidth || document.documentElement.clientWidth);

  // Check if any part of the element is within the viewport boundaries
  const vertInView = (rect.top <= windowHeight) && (rect.bottom >= 0);
  const horInView = (rect.left <= windowWidth) && (rect.right >= 0);

  return vertInView && horInView;
} */



function isElementPartiallyInViewport(el) {

    const bottomOfElementInViewport = el.getBoundingClientRect().bottom;
    let p = bottomOfElementInViewport/window.innerHeight;

    if (p<0.82 && p>.4) {
        return true;
    } else {
        return false;
    }
    

}



function stripHtml(html) {
  var temporalDivElement = document.createElement("div"); //
  temporalDivElement.innerHTML = html; //
  return temporalDivElement.textContent || temporalDivElement.innerText || "";  
}

