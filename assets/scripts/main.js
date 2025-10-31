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

});