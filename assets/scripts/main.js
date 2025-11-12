$(function () {
    $('.slick-slider').each(function () {
        let slider = $(this);
        let options = {
            prevArrow: slider.parent().find('.slider-prev'),
            nextArrow: slider.parent().find('.slider-next'),
            infinite: true,
            autoplay: true,
        }
        let extraOptions = {}
        if (slider.hasClass('banner')) {
            extraOptions = {
                slidesToShow: 1,
                slidesToScroll: 1,
                centerMode: false,
                arrows: true,
                autoplay: true,
                responsive: [
                    {
                        breakpoint: 1200,
                        settings: {
                            slidesToShow: 1,
                            slidesToScroll: 1,
                            arrows: false
                        }
                    },
                ]
            }
        } else if (slider.hasClass('products')) {
            extraOptions = {
                slidesToShow: 3,
                slidesToScroll: 1,
                centerMode: false,
                arrows: true,
                dots: true,
                autoplay: true,
                adaptiveHeight: true,
                responsive: [
                    {
                        breakpoint: 1200,
                        settings: {
                            slidesToShow: 2.5,
                            slidesToScroll: 1,
                            dots: true,
                        }
                    },
                    {
                        breakpoint: 992,
                        settings: {
                            slidesToShow: 2,
                            slidesToScroll: 1,
                            dots: false,
                            adaptiveHeight: true,
                        }
                    }, {
                        breakpoint: 768,
                        settings: {
                            slidesToShow: 1,
                            slidesToScroll: 1,
                            dots: false,
                            adaptiveHeight: true,
                        }
                    },
                    {
                        breakpoint: 576,
                        settings: {
                            slidesToShow: 1,
                            slidesToScroll: 1,
                            dots: false,
                            adaptiveHeight: true,
                        }
                    },
                ]
            }
        } else if (slider.hasClass('news')) {
            extraOptions = {
                slidesToShow: 3,
                slidesToScroll: 1,
                centerMode: false,
                arrows: true,
                dots: false,
                autoplay: true,
                adaptiveHeight: true,
                responsive: [
                    {
                        breakpoint: 1200,
                        settings: {
                            slidesToShow: 2.5,
                            slidesToScroll: 1,
                            dots: true,
                        }
                    },
                    {
                        breakpoint: 992,
                        settings: {
                            slidesToShow: 2,
                            slidesToScroll: 1,
                            dots: false,
                            adaptiveHeight: true,
                        }
                    }, {
                        breakpoint: 768,
                        settings: {
                            slidesToShow: 1,
                            slidesToScroll: 1,
                            dots: false,
                            adaptiveHeight: true,
                        }
                    },
                    {
                        breakpoint: 576,
                        settings: {
                            slidesToShow: 1,
                            slidesToScroll: 1,
                            dots: false,
                            adaptiveHeight: true,
                        }
                    },
                ]
            }
        }
        slider.slick($.extend({}, extraOptions, options));
    })


    const thumbsSwiper = new Swiper(".swiper-thumbs", {
        loop: true,
        spaceBetween: 10,
        slidesPerView: 4, // по умолчанию 4
        freeMode: true,
        watchSlidesProgress: true,

        // Адаптив
        breakpoints: {
            0: {
                slidesPerView: 3, // на мобильных 3
            },
            769: {
                slidesPerView: 4, // на десктопе 4
            },
        },
    });

    // Основной слайдер
    const mainSwiper = new Swiper(".swiper-main", {
        loop: true,
        spaceBetween: 10,
        thumbs: {
            swiper: thumbsSwiper,
        },
    });

    $('.number-input').each(function () {
        const $wrapper = $(this);
        const $input = $wrapper.find('input');
        const $plus = $wrapper.find('.plus');
        const $minus = $wrapper.find('.minus');

        $plus.on('click', function () {
            let value = parseInt($input.val()) || 0;
            $input.val(value + 1).trigger('change');
        });

        $minus.on('click', function () {
            let value = parseInt($input.val()) || 0;
            let min = parseInt($input.attr('min')) || 0;
            if (value > min) {
                $input.val(value - 1).trigger('change');
            }
        });
    });

    const bannerSelector = '.hero';      // селектор баннера
    const sectionSelector = '.section';  // селектор всех обычных секций
    const scrollLockTime = 800; // ms - блокировка, чтобы не сработало несколько раз

    const banner = document.querySelector(bannerSelector);
    const sections = Array.from(document.querySelectorAll(sectionSelector));

    if (!banner || sections.length === 0) return;

    let isLocked = false;
    let touchStartY = null;

    function lockTemporarily() {
        isLocked = true;
        setTimeout(() => { isLocked = false; }, scrollLockTime);
    }

    function scrollToElement(el) {
        if (!el) return;
        // Используем native плавный скролл (CSS scroll-behavior: smooth)
        el.scrollIntoView({ block: 'start', behavior: 'smooth' });
        lockTemporarily();
    }

    function isElementMostlyInViewport(el) {
        const rect = el.getBoundingClientRect();
        // считаем "в видимой области", если верх элемента близок к 0 и элемент виден больше половины
        const vh = window.innerHeight || document.documentElement.clientHeight;
        return rect.top >= -vh * 0.25 && rect.top <= vh * 0.25;
    }

    function onWheel(e) {
        if (isLocked) return;
        const deltaY = e.deltaY;

        // порог, чтобы защититься от маленьких срабатываний тачпада
        if (Math.abs(deltaY) < 20) return;

        const bannerInView = isElementMostlyInViewport(banner);

        if (bannerInView && deltaY > 0) {
            // из баннера — вниз к первой секции
            e.preventDefault && e.preventDefault();
            scrollToElement(sections[0]);
            return;
        }

        // если мы НЕ в баннере и скроллим вверх — и при этом верх секции видим (т.е. мы у её начала),
        // то возвращаемся к баннеру
        if (deltaY < 0) {
            // найдём секцию, верх которой находится в видимой области (или ближайшую)
            const currentSection = sections.find(s => isElementMostlyInViewport(s));
            if (currentSection) {
                // убедимся, что пользователь находится у верхней границы секции (чтобы не мешать обычной прокрутке внутри длинной секции)
                const rect = currentSection.getBoundingClientRect();
                // если верх секции примерно вверху окна (или выше), считаем, что он у начала
                if (rect.top >= -10 && rect.top <= window.innerHeight * 0.2) {
                    e.preventDefault && e.preventDefault();
                    scrollToElement(banner);
                }
            }
        }
    }

    // Для тач-устройств: свайп вверх/вниз
    function onTouchStart(e) {
        if (e.touches && e.touches.length) {
            touchStartY = e.touches[0].clientY;
        } else {
            touchStartY = null;
        }
    }

    function onTouchEnd(e) {
        if (isLocked || touchStartY === null) return;
        const touchEndY = (e.changedTouches && e.changedTouches[0]) ? e.changedTouches[0].clientY : null;
        if (touchEndY === null) return;

        const dy = touchStartY - touchEndY; // положительное — свайп вверх (перемещения контента вверх => пользователь свайпит вверх)
        const threshold = 30; // минимальный свайп в px
        const bannerInView = isElementMostlyInViewport(banner);

        if (Math.abs(dy) < threshold) return;

        if (bannerInView && dy > 0) {
            // свайп вверх на баннер -> вниз к секции
            scrollToElement(sections[0]);
        } else if (!bannerInView && dy < 0) {
            // свайп вниз (пользователь тянет экран вниз) — хотим вернуться на баннер, но только если находимся близко к началу секции
            const currentSection = sections.find(s => isElementMostlyInViewport(s));
            if (currentSection) {
                const rect = currentSection.getBoundingClientRect();
                if (rect.top >= -10 && rect.top <= window.innerHeight * 0.2) {
                    scrollToElement(banner);
                }
            }
        }
        touchStartY = null;
    }

    // Подписываемся на события. Для wheel нужен passive: false чтобы можно было preventDefault
    window.addEventListener('wheel', onWheel, { passive: false });
    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchend', onTouchEnd, { passive: false });
});