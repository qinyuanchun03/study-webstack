/**
 * 性能优化脚本
 * 用于提高页面加载速度和运行性能
 */

// 延迟加载非关键资源
document.addEventListener('DOMContentLoaded', function() {
  // 图片懒加载优化
  const lazyImages = document.querySelectorAll('img.lazy');

  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver(function(entries, observer) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          const lazyImage = entry.target;
          lazyImage.src = lazyImage.dataset.src;
          lazyImage.classList.remove('lazy');
          imageObserver.unobserve(lazyImage);
        }
      });
    });

    lazyImages.forEach(function(lazyImage) {
      imageObserver.observe(lazyImage);
    });
  } else {
    // 回退到传统的懒加载方法
    let lazyLoadThrottleTimeout;

    function lazyLoad() {
      if (lazyLoadThrottleTimeout) {
        clearTimeout(lazyLoadThrottleTimeout);
      }

      lazyLoadThrottleTimeout = setTimeout(function() {
        const scrollTop = window.pageYOffset;
        lazyImages.forEach(function(lazyImage) {
          if (lazyImage.offsetTop < (window.innerHeight + scrollTop)) {
            lazyImage.src = lazyImage.dataset.src;
            lazyImage.classList.remove('lazy');
          }
        });
        if (lazyImages.length == 0) {
          document.removeEventListener('scroll', lazyLoad);
          window.removeEventListener('resize', lazyLoad);
          window.removeEventListener('orientationChange', lazyLoad);
        }
      }, 20);
    }

    document.addEventListener('scroll', lazyLoad);
    window.addEventListener('resize', lazyLoad);
    window.addEventListener('orientationChange', lazyLoad);
  }

  // 优化动画性能 - 限制动画元素数量并简化动画类型
  const animatedElements = document.querySelectorAll('[data-aos]');

  // 检测设备性能
  const isLowEndDevice = () => {
    const isLowRAM = navigator.deviceMemory && navigator.deviceMemory < 4;
    const isSlowCPU = navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4;
    return isLowRAM || isSlowCPU || window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  };

  // 根据设备性能调整动画
  if (isLowEndDevice() || animatedElements.length > 30) {
    // 对于低端设备或动画元素过多的情况，大幅减少动画
    animatedElements.forEach((el, index) => {
      // 只保留前15个元素的动画，并且只使用简单的淡入效果
      if (index > 15) {
        el.removeAttribute('data-aos');
      } else {
        // 将所有动画类型简化为淡入
        el.setAttribute('data-aos', 'fade');
        // 减少动画持续时间
        el.setAttribute('data-aos-duration', '200');
      }
    });
  } else {
    // 对于性能较好的设备，也限制动画数量，但保留更多
    animatedElements.forEach((el, index) => {
      if (index > 30) {
        el.removeAttribute('data-aos');
      } else {
        // 确保动画持续时间不会太长
        el.setAttribute('data-aos-duration', '300');
      }
    });
  }

  // 为低端设备减少视觉效果
  if (isLowEndDevice()) {
    document.body.classList.add('reduce-animations');
  }
});

// 优化滚动性能
let scrollTimeout;
window.addEventListener('scroll', function() {
  if (!scrollTimeout) {
    scrollTimeout = setTimeout(function() {
      scrollTimeout = null;

      // 在滚动时执行的代码
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

      // 滚动到一定距离时显示回到顶部按钮
      const scrollToTopBtn = document.getElementById('scroll-to-top');
      if (scrollToTopBtn) {
        if (scrollTop > 300) {
          scrollToTopBtn.classList.add('show');
        } else {
          scrollToTopBtn.classList.remove('show');
        }
      }

    }, 10);
  }
}, { passive: true });

// 预加载关键资源
const preloadLinks = [
  { rel: 'preconnect', href: 'https://cdn.jsdelivr.net' },
  { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
  { rel: 'dns-prefetch', href: 'https://cdn.jsdelivr.net' }
];

preloadLinks.forEach(link => {
  const linkEl = document.createElement('link');
  linkEl.rel = link.rel;
  linkEl.href = link.href;
  document.head.appendChild(linkEl);
});
