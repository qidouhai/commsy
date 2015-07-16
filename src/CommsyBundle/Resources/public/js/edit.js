;(function(UI) {

    "use strict";

    UI.component('edit', {

        defaults: {
            editUrl: ''
        },

        boot: function() {
            // init code
            UI.ready(function(context) {
                UI.$("[data-cs-edit]", context).each(function() {
                    var element = UI.$(this);

                    if (!element.data("edit")) {
                        var obj = UI.edit(element, UI.Utils.options(element.attr("data-cs-edit")));
                    }
                });
            });
        },

        init: function() {
            var $this = this;

            var element = $this.element[0];

            // look for div.cs-article-edit and show on hover
            $(element).hover(function() {
                $(this).find('div.cs-article-edit').toggleClass('uk-hidden', false);
            }, function() {
                $(this).find('div.cs-article-edit').toggleClass('uk-hidden', true);
            });

            // show articles as selected, when hovering the edit icon
            $(element).find('div.cs-article-edit').hover(function() {
                $(this).parent('article').toggleClass('cs-article-selected', true);
            }, function() {
                $(this).parent('article').toggleClass('cs-article-selected', false);
            });

            // send ajax requests on click to load the form
            $(element).find('div.cs-article-edit').click(function(event) {
                event.preventDefault();
                $this.onClickEdit(this);
            });
        },

        onClickEdit: function(el) {
            var $this = this;
            var article = $(el).parent('article');
            // send ajax request to get edit html
            $.ajax({
              url: this.options.editUrl
            })
            .done(function(result) {
                article.html(result);
                article.find('form').submit(function (e) {
                    e.preventDefault ();
                    $ .ajax ({
                        url: $this.options.editUrl,
                        type: "POST",
                        data: $(this).serialize()
                    })
                    .done(function(result){
                        article.html(result);
                        article.find('div.cs-article-edit').click(function(event) {
                            event.preventDefault();
                            $this.onClickEdit(this);
                        });
                    });
                });
            });
        }
    });

})(UIkit);