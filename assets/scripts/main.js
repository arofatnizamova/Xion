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
                autoPlay: true,
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
        } else if (slider.hasClass('team')) {
            extraOptions = {
                slidesToShow: 4,
                slidesToScroll: 1,
                centerMode: false,
                arrows: true,
                autoPlay: true,
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
                            dots: true,
                            arrows: false,
                            adaptiveHeight: true,
                        }
                    }, {
                        breakpoint: 768,
                        settings: {
                            slidesToShow: 1,
                            slidesToScroll: 1,
                            dots: true,
                            adaptiveHeight: true,
                        }
                    },
                    {
                        breakpoint: 576,
                        settings: {
                            slidesToShow: 1,
                            slidesToScroll: 1,
                            dots: true,
                            adaptiveHeight: true,
                        }
                    },
                ]
            }
        }
        slider.slick($.extend({}, extraOptions, options));
    })
});