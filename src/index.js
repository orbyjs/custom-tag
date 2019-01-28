import { h, render } from "@orby/core";

let CustomTags = {};
let CustomViews = {};

export default function register({ tag, props, children }) {
    CustomViews[tag] = {
        Component: children[0],
        scoped: props.scoped,
        props: props.props || []
    };
    if (!CustomTags[tag]) {
        CustomTags[tag] = class extends HTMLElement {
            constructor() {
                super();
                this.props = {};
                if (CustomViews[tag].scoped) {
                    this.attachShadow({ mode: "open" });
                }
            }
            static get observedAttributes() {
                return CustomViews[tag] ? CustomViews[tag].props : [];
            }
            connectedCallback() {
                this.mounted = true;
                this.mapAllProps();
                this.update();
            }
            disconnectedCallback() {
                this.update(true);
            }
            attributeChangedCallback(name, prev, next) {
                if (prev === next) return;
                this.props[name] = next;
                this.update();
            }
            mapAllProps() {
                let listProps = CustomViews[tag].props;
                for (let i = 0; i < listProps.length; i++) {
                    let index = listProps[i];
                    this.props[index] = this.getAttribute(index);
                }
            }
            update(dismount) {
                if (!this.mounted) return;
                if (this.prevent) return;
                this.prevent = true;
                setTimeout(() => {
                    this.lastView = render(
                        h(dismount ? "" : CustomViews[tag].Component, props),
                        CustomViews[tag].scoped
                            ? this.shadowRoot || this
                            : this,
                        this.lastView
                    );
                    this.prevent = false;
                });
            }
        };
        customElements.define(tag, CustomTags[tag]);
    }
    document.querySelectorAll(tag).forEach(element => element.update());
}
