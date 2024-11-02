import Link from '@tiptap/extension-link';

const CustomLink = Link.extend({
    inclusive: false,
    renderHTML({ mark, HTMLAttributes }) {
        const href = mark.attrs.href;

        const linkDomain = new URL(href, window.location.origin).hostname;
        const currentDomain = window.location.hostname; // Get the domain of the current site
        const isInternalLink = linkDomain === currentDomain;

        const attributes = isInternalLink
            ?   {...HTMLAttributes, rel: 'noopener', class: 'cursor-pointer text-blue-700 hover:underline'}
            :   {...HTMLAttributes, rel: 'noopener noreferrer nofollow', target: '_blank', class: 'cursor-pointer hover:underline', style: 'color: #009900',};

        return ['a', attributes, 0];
    },
}).configure({defaultProtocol: 'https'});

export default CustomLink;
