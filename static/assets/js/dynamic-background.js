/**
 * Dynamic Background Effects
 * 为网站添加动态背景效果
 */

(function() {
  'use strict';
  
  // 创建动态粒子背景
  function createParticleBackground() {
    // 检查是否已经存在粒子容器
    if (document.getElementById('particles-js')) {
      return;
    }
    
    // 创建粒子容器
    const particlesContainer = document.createElement('div');
    particlesContainer.id = 'particles-js';
    particlesContainer.style.position = 'fixed';
    particlesContainer.style.top = '0';
    particlesContainer.style.left = '0';
    particlesContainer.style.width = '100%';
    particlesContainer.style.height = '100%';
    particlesContainer.style.zIndex = '-10';
    particlesContainer.style.pointerEvents = 'none';
    
    // 添加到body
    document.body.appendChild(particlesContainer);
    
    // 检测是否为暗色模式
    const isDarkMode = document.body.classList.contains('io-black-mode');
    
    // 加载particles.js库
    if (typeof particlesJS === 'undefined') {
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js';
      script.onload = function() {
        initParticles(isDarkMode);
      };
      document.head.appendChild(script);
    } else {
      initParticles(isDarkMode);
    }
  }
  
  // 初始化粒子效果
  function initParticles(isDarkMode) {
    const particleColor = isDarkMode ? '#ffffff' : '#3a7bd5';
    const lineColor = isDarkMode ? '#ffffff' : '#3a7bd5';
    
    particlesJS('particles-js', {
      "particles": {
        "number": {
          "value": 80,
          "density": {
            "enable": true,
            "value_area": 800
          }
        },
        "color": {
          "value": particleColor
        },
        "shape": {
          "type": "circle",
          "stroke": {
            "width": 0,
            "color": "#000000"
          },
          "polygon": {
            "nb_sides": 5
          }
        },
        "opacity": {
          "value": 0.3,
          "random": false,
          "anim": {
            "enable": false,
            "speed": 1,
            "opacity_min": 0.1,
            "sync": false
          }
        },
        "size": {
          "value": 3,
          "random": true,
          "anim": {
            "enable": false,
            "speed": 40,
            "size_min": 0.1,
            "sync": false
          }
        },
        "line_linked": {
          "enable": true,
          "distance": 150,
          "color": lineColor,
          "opacity": 0.2,
          "width": 1
        },
        "move": {
          "enable": true,
          "speed": 2,
          "direction": "none",
          "random": false,
          "straight": false,
          "out_mode": "out",
          "bounce": false,
          "attract": {
            "enable": false,
            "rotateX": 600,
            "rotateY": 1200
          }
        }
      },
      "interactivity": {
        "detect_on": "canvas",
        "events": {
          "onhover": {
            "enable": true,
            "mode": "grab"
          },
          "onclick": {
            "enable": false,
            "mode": "push"
          },
          "resize": true
        },
        "modes": {
          "grab": {
            "distance": 140,
            "line_linked": {
              "opacity": 0.5
            }
          },
          "bubble": {
            "distance": 400,
            "size": 40,
            "duration": 2,
            "opacity": 8,
            "speed": 3
          },
          "repulse": {
            "distance": 200,
            "duration": 0.4
          },
          "push": {
            "particles_nb": 4
          },
          "remove": {
            "particles_nb": 2
          }
        }
      },
      "retina_detect": true
    });
  }
  
  // 添加滚动效果
  function addScrollEffects() {
    // 监听滚动事件
    window.addEventListener('scroll', function() {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      
      // 获取所有卡片
      const cards = document.querySelectorAll('.url-card');
      
      // 为每个卡片添加滚动效果
      cards.forEach(function(card, index) {
        const cardTop = card.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        // 当卡片进入视口时添加动画
        if (cardTop < windowHeight * 0.85) {
          // 添加延迟，使卡片依次显示
          setTimeout(function() {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, index * 50);
        }
      });
    });
    
    // 初始化卡片样式
    const cards = document.querySelectorAll('.url-card');
    cards.forEach(function(card) {
      card.style.opacity = '0';
      card.style.transform = 'translateY(20px)';
      card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    // 触发一次滚动事件，以显示初始可见的卡片
    window.dispatchEvent(new Event('scroll'));
  }
  
  // 添加暗色模式切换效果
  function enhanceDarkModeToggle() {
    const darkModeToggle = document.querySelector('.switch-dark-mode');
    if (darkModeToggle) {
      darkModeToggle.addEventListener('click', function() {
        // 等待暗色模式切换完成后重新初始化粒子效果
        setTimeout(function() {
          const isDarkMode = document.body.classList.contains('io-black-mode');
          if (typeof particlesJS !== 'undefined') {
            document.getElementById('particles-js').innerHTML = '';
            initParticles(isDarkMode);
          }
        }, 300);
      });
    }
  }
  
  // 页面加载完成后初始化
  document.addEventListener('DOMContentLoaded', function() {
    createParticleBackground();
    addScrollEffects();
    enhanceDarkModeToggle();
  });
})();
