define(["browser", "css!./emby-collapse", "registerElement", "emby-button"], function(browser) {
    "use strict";

    function slideDownToShow(button, elem) {
        elem.classList.remove("hide"), elem.classList.add("expanded"), elem.style.height = "auto";
        var height = elem.offsetHeight + "px";
        elem.style.height = "0";
        elem.offsetHeight;
        elem.style.height = height, setTimeout(function() {
            elem.classList.contains("expanded") ? elem.classList.remove("hide") : elem.classList.add("hide"), elem.style.height = "auto"
        }, 300), button.querySelector("i").classList.add("emby-collapse-expandIconExpanded")
    }

    function slideUpToHide(button, elem) {
        elem.style.height = elem.offsetHeight + "px";
        elem.offsetHeight;
        elem.classList.remove("expanded"), elem.style.height = "0", setTimeout(function() {
            elem.classList.contains("expanded") ? elem.classList.remove("hide") : elem.classList.add("hide")
        }, 300), button.querySelector("i").classList.remove("emby-collapse-expandIconExpanded")
    }

    function onButtonClick(e) {
        var button = this,
            collapseContent = button.parentNode.querySelector(".collapseContent");
        collapseContent.expanded ? (collapseContent.expanded = !1, slideUpToHide(button, collapseContent)) : (collapseContent.expanded = !0, slideDownToShow(button, collapseContent))
    }
    var EmbyButtonPrototype = Object.create(HTMLDivElement.prototype);
    EmbyButtonPrototype.attachedCallback = function() {
        if (!this.classList.contains("emby-collapse")) {
            this.classList.add("emby-collapse");
            var collapseContent = this.querySelector(".collapseContent");
            collapseContent && collapseContent.classList.add("hide");
            var title = this.getAttribute("title"),
                html = '<button is="emby-button" type="button" on-click="toggleExpand" id="expandButton" class="emby-collapsible-button iconRight"><h3 class="emby-collapsible-title" title="' + title + '">' + title + '</h3><i class="md-icon emby-collapse-expandIcon">expand_more</i></button>';
            this.insertAdjacentHTML("afterbegin", html);
            var button = this.querySelector(".emby-collapsible-button");
            button.addEventListener("click", onButtonClick), "true" === this.getAttribute("data-expanded") && onButtonClick.call(button)
        }
    }, document.registerElement("emby-collapse", {
        prototype: EmbyButtonPrototype,
        extends: "div"
    })
});