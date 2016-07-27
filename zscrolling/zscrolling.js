(function($) {

    $.zscrolling = function(element, options) {

        var defaults = {
            wrapperClass: "zScrolling-wrapper",
            layerClass: "zScrolling-layer",
            layerSpacing: 400
        }

        var plugin = this;

        plugin.settings = {}

        var $element = $(element),
             element = element;

        plugin.init = function() {
            plugin.settings = $.extend({}, defaults, options);
            plugin.element = element;

            $(plugin.element).addClass(plugin.settings.wrapperClass);
            $('.' + plugin.settings.wrapperClass + ' > *').addClass(plugin.settings.layerClass);

            var zIndex = 0;
            $('.' + plugin.settings.layerClass).each(function(i) {
                $(this).attr('data-z', zIndex).addClass('layer-' + (i+1));
                zIndex -= plugin.settings.layerSpacing;
            });

            handleScroll();
        }

        var handleScroll = function() {

            $(plugin.element).bind('mousewheel', function(e) {

                $('.' + plugin.settings.layerClass).each(function(i) {

                    var z = parseInt($(this).attr('data-z'));
                    z = z;

                    if(e.originalEvent.wheelDelta / 120 > 0) {
                      z += 150;
                    } else {
                      z -= 150;
                    }

                    if (i == 1) {
                        $(this).css({
                          transform: "translate3d(0, 0, "+z+"px) scale(1.5)"
                        }).attr('data-z', z);
                    } else {
                        $(this).css({
                          transform: "translate3d(0, 0, "+z+"px)"
                        }).attr('data-z', z);
                    }

                });

                return false;

            });

        }

        plugin.init();

    }

    $.fn.zscrolling = function(options) {

        return this.each(function() {
            if (undefined == $(this).data('zscrolling')) {
                var plugin = new $.zscrolling(this, options);
                $(this).data('zscrolling', plugin);
            }
        });

    }

})(jQuery);