// fastclick
window.addEventListener('load', function() {
    new FastClick(document.body);
}, false);
//图片懒加载
let lazyImg = document.querySelectorAll('.lazy');
if (lazyImg.length) {
    new LazyLoad({})
};
//响应结构调整
let nav_mask = document.getElementById("nav_mask");
let nav_main = nav_mask.querySelector(".nav_main");
let search_mask = document.getElementById("search_mask");
let saerch_main = search_mask.querySelector(".search_main");
let branch_nav = document.querySelector(".branch_nav");
let top_nav = branch_nav.querySelector(".top_nav");
let category = branch_nav.querySelector(".category");
let sub_nav = category.querySelector(".sub_nav");
let search_pat = document.querySelector(".search_pat");
let mobile_memu_btn = document.querySelector(".mobile_memu_btn");
let mobile_search_btn = document.querySelector(".mobile_search_btn");
const  response_html = ()  => {
    let widowWidth  = document.documentElement.clientWidth || document.body.clientWidth;
    if(widowWidth <= 770 ){
        if(!saerch_main.contains(search_pat))saerch_main.prepend(search_pat);
        if(!nav_main.contains(top_nav)){
            nav_main.append(top_nav,sub_nav);
        }
    }else{
        if(saerch_main.contains(search_pat))mobile_search_btn.before(search_pat);
        if(nav_main.contains(top_nav)){
            category.before(top_nav);
            category.append(sub_nav);
        }
    }
}
response_html();
window.addEventListener('resize',_.debounce(response_html,100));
mobile_memu_btn.addEventListener("click",(e)=>{
    e.currentTarget.classList.toggle("active");
    nav_mask.classList.toggle("active");
});
nav_mask.addEventListener("click",(e)=>{
    if(e.target === e.currentTarget) {
        mobile_memu_btn.classList.remove('active');
        e.currentTarget.classList.remove('active');
    }
});
mobile_search_btn.addEventListener("click",(e)=>{
    e.currentTarget.classList.toggle("active");
    search_mask.classList.toggle("active");
});
search_mask.addEventListener("click",(e)=>{
    if(e.target === e.currentTarget) {
        mobile_search_btn.classList.remove('active');
        e.currentTarget.classList.remove('active');
    }
});
window.addEventListener("click",(e)=>{
    let paths = e.composedPath();
    if(!paths.includes(mobile_memu_btn) && !paths.includes(nav_mask) && mobile_memu_btn.classList.contains('active')){
        mobile_memu_btn.classList.remove('active');
        nav_mask.classList.remove('active');
    }
    if(!paths.includes(mobile_search_btn) && !paths.includes(search_mask) && mobile_search_btn.classList.contains('active')){
        mobile_search_btn.classList.remove('active');
        search_mask.classList.remove('active');
    }
});

// Fix play button on mobile - ensure it works with touch events
document.addEventListener('DOMContentLoaded', function() {
    // Find all play buttons in iframe_box .action
    const playButtons = document.querySelectorAll('.iframe_box .action a');
    
    playButtons.forEach(function(playButton) {
        // Remove the javascript: href to prevent issues
        const originalHref = playButton.getAttribute('href');
        if (originalHref && originalHref.startsWith('javascript:')) {
            playButton.setAttribute('href', '#');
        }
        
        // Add proper event handlers for both click and touch
        function handlePlayClick(e) {
            e.preventDefault();
            e.stopPropagation();
            
            // Find the parent iframe_box
            const iframeBox = playButton.closest('.iframe_box');
            if (iframeBox) {
                iframeBox.classList.add('active');
            }
            
            return false;
        }
        
        // Add multiple event listeners for maximum compatibility
        playButton.addEventListener('click', handlePlayClick, { passive: false });
        playButton.addEventListener('touchend', function(e) {
            e.preventDefault();
            handlePlayClick(e);
        }, { passive: false });
        playButton.addEventListener('touchstart', function(e) {
            // Prevent default to avoid double-tap zoom on iOS
            e.preventDefault();
        }, { passive: false });
    });
});