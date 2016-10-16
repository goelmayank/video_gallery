(function($) {
  var playList = [];
  
  // generate play list
  $('.playList a').each(function() {
    var clip = {src: $(this).data('video')
               ,poster: getBackgroundImage($(this).css('background-image'))
               ,title: $(this).text()
               };
    playList.push(clip);
  });

  var video = $('.video').video().data('Video');
  var videoTitle = $('#videoTitle');

  var currentIndex = 0;

  function playNext() {
    if(currentIndex === playList.length - 1) {
      currentIndex = 0;
    } else {
      currentIndex++;
    }
    playVideo(currentIndex);
  }

  function playPrev() {
    if(currentIndex === 0) {
      currentIndex = playList.length - 1;
    } else {
      currentIndex--;
    }
    playVideo(currentIndex);
  }
  

  function playVideo(index) {
    var clip = playList[index];
    video.updateSrc(clip.src, clip.poster);
    $(videoTitle).text(clip.title);
    video.play();
  }

  $('[data-prev]').on('click', function() {
    playPrev();
  });
  $('[data-next]').on('click', function() {
    playNext();
  });
  $('.js-media').on('ended', function() {
    playNext();
  }).on('loadedmetadata', function() {
    setVideoActive(currentIndex);
  });
  
  var slider = $('.playList').bxSlider({
    mode: 'vertical'
    ,startSlide: 0
    ,pager: false
    ,minSlides: 3
    ,maxSlides: 3
    ,moveSlides: 1
  });

  setTimeout(function() {
    slider.goToSlide(5);// let browser figures out the height of the slides
  }, 100);
  
  $('.playList a').on('click', function() {
    var videoIndex = $(this).data('index');
    playVideo(videoIndex);
    currentIndex = videoIndex;
  });
  
  function setVideoActive(index) {
    $('.playList a').removeClass('active');
    $('.playList a[data-index="' + index + '"]').addClass('active');
    var goTo = index - 1;
    if(index === 0) {
      goTo = playList.length - 1;
    }
    slider.goToSlide(goTo);
  }
  
  function getBackgroundImage(style) {
    return style.replace('url(','').replace(')', '');
  }
})(jQuery);