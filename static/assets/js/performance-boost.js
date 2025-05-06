/**
 * Performance Optimization and Loading Animation
 * 性能优化和加载动画控制
 */

(function() {
  'use strict';

  // 页面加载性能监控
  const perfData = {
    startTime: performance.now(),
    resourcesLoaded: 0,
    totalResources: 0,
    domReady: false,
    windowLoaded: false
  };

  // 获取加载动画元素
  const loadingElement = document.getElementById('loading');

  // 资源加载优先级控制
  function prioritizeResources() {
    // 获取所有图片元素
    const images = document.querySelectorAll('img');

    // 获取所有脚本和样式表
    const scripts = document.querySelectorAll('script[src]');
    const stylesheets = document.querySelectorAll('link[rel="stylesheet"]');

    // 计算总资源数量（图片、脚本、样式表）
    perfData.totalResources = images.length + scripts.length + stylesheets.length;

    // 确保至少有一个资源被计数，防止除以零错误
    if (perfData.totalResources === 0) {
      perfData.totalResources = 1;
      perfData.resourcesLoaded = 1; // 如果没有资源，直接标记为已加载
      updateLoadingProgress();
      return;
    }

    // 为每个图片添加加载事件
    images.forEach(img => {
      // 如果图片已经加载完成，直接计数
      if (img.complete) {
        perfData.resourcesLoaded++;
        updateLoadingProgress();
        return;
      }

      // 如果图片不在视口中，添加延迟加载
      if (!isInViewport(img) && !img.classList.contains('lazyloaded')) {
        // 保存原始src
        const originalSrc = img.src;
        // 清除src，防止立即加载
        img.removeAttribute('src');
        // 将原始src存储在data属性中
        img.dataset.src = originalSrc;
        // 添加懒加载类
        img.classList.add('lazy-image');
      }

      // 添加加载完成事件
      img.addEventListener('load', () => {
        perfData.resourcesLoaded++;
        updateLoadingProgress();
      });

      // 添加加载错误事件
      img.addEventListener('error', () => {
        perfData.resourcesLoaded++;
        updateLoadingProgress();
      });
    });

    // 初始化懒加载
    initLazyLoading();

    // 更新初始加载进度
    updateLoadingProgress();
  }

  // 检查元素是否在视口中
  function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }

  // 初始化懒加载
  function initLazyLoading() {
    // 创建Intersection Observer
    const lazyImageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const lazyImage = entry.target;
          // 设置src属性，开始加载图片
          if (lazyImage.dataset.src) {
            lazyImage.src = lazyImage.dataset.src;
          }
          // 移除懒加载类
          lazyImage.classList.remove('lazy-image');
          // 停止观察这个元素
          observer.unobserve(lazyImage);
        }
      });
    });

    // 观察所有懒加载图片
    document.querySelectorAll('.lazy-image').forEach(lazyImage => {
      lazyImageObserver.observe(lazyImage);
    });
  }

  // 更新加载进度
  function updateLoadingProgress() {
    if (!loadingElement) return;

    // 计算加载进度百分比
    const progress = perfData.totalResources > 0
      ? (perfData.resourcesLoaded / perfData.totalResources) * 100
      : 0;

    // 更新加载动画
    const loadingInner = loadingElement.querySelector('.loading-inner');
    if (loadingInner) {
      loadingInner.style.width = `${Math.min(progress, 100)}%`;
    }

    // 检查是否所有资源都已加载
    checkAllLoaded();
  }

  // 检查是否所有内容都已加载
  function checkAllLoaded() {
    // 添加一个最大等待时间，确保加载动画不会无限等待
    const MAX_WAIT_TIME = 8000; // 最大等待8秒
    const elapsedTime = performance.now() - perfData.startTime;

    // 如果DOM已加载完成，并且满足以下任一条件，则隐藏加载动画：
    // 1. 所有资源都已加载完成
    // 2. 窗口加载事件已触发
    // 3. 已经等待了最大等待时间
    // 4. 进度条已经达到100%
    if (perfData.domReady &&
        (perfData.resourcesLoaded >= perfData.totalResources ||
         perfData.windowLoaded ||
         elapsedTime > MAX_WAIT_TIME ||
         (perfData.resourcesLoaded > 0 && perfData.totalResources > 0 &&
          perfData.resourcesLoaded / perfData.totalResources >= 0.95))) {

      // 所有内容已加载，可以隐藏加载动画
      hideLoadingAnimation();

      // 记录性能数据
      console.log(`页面加载完成，耗时: ${elapsedTime.toFixed(2)}ms`);
      console.log(`资源加载: ${perfData.resourcesLoaded}/${perfData.totalResources}`);
    }
  }

  // 隐藏加载动画
  function hideLoadingAnimation() {
    if (!loadingElement) return;

    // 添加关闭类，触发淡出动画
    loadingElement.classList.add('close');

    // 动画结束后移除元素
    setTimeout(() => {
      if (loadingElement.parentNode) {
        loadingElement.parentNode.removeChild(loadingElement);
      }
    }, 600); // 与CSS动画持续时间匹配
  }

  // 预加载关键资源
  function preloadCriticalResources() {
    // 预加载字体
    const fontUrls = [
      'https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap'
    ];

    fontUrls.forEach(url => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'style';
      link.href = url;
      document.head.appendChild(link);

      // 立即加载字体
      const fontLink = document.createElement('link');
      fontLink.rel = 'stylesheet';
      fontLink.href = url;
      document.head.appendChild(fontLink);
    });
  }

  // 优化第三方脚本加载
  function optimizeThirdPartyScripts() {
    // 查找所有非关键的第三方脚本
    const nonCriticalScripts = document.querySelectorAll('script[data-defer]');

    // 延迟加载非关键脚本
    nonCriticalScripts.forEach(script => {
      const src = script.getAttribute('src');
      if (src) {
        // 移除原始脚本
        script.parentNode.removeChild(script);

        // 在页面加载完成后加载脚本
        window.addEventListener('load', () => {
          const newScript = document.createElement('script');
          newScript.src = src;
          document.body.appendChild(newScript);
        });
      }
    });
  }

  // 初始化性能优化
  function initPerformanceOptimizations() {
    // 预加载关键资源
    preloadCriticalResources();

    // 优化资源加载顺序
    prioritizeResources();

    // 优化第三方脚本
    optimizeThirdPartyScripts();

    // 监听DOM内容加载完成事件
    document.addEventListener('DOMContentLoaded', () => {
      perfData.domReady = true;
      checkAllLoaded();
    });

    // 监听窗口加载完成事件
    window.addEventListener('load', () => {
      perfData.windowLoaded = true;
      checkAllLoaded();
    });

    // 添加安全定时器，确保加载动画不会永久显示
    setTimeout(() => {
      if (loadingElement && loadingElement.parentNode) {
        console.log('安全机制触发：强制完成加载动画');
        hideLoadingAnimation();
      }
    }, 10000); // 10秒后强制隐藏加载动画
  }

  // 在DOM准备好后初始化
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPerformanceOptimizations);
  } else {
    initPerformanceOptimizations();
  }
})();
