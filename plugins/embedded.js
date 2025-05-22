import EmbedJS from 'embed-js'
import url from 'embed-plugin-url'
import emoji from 'embed-plugin-emoji'

export default ({ app }, inject) => {
    inject('embed',
        new EmbedJS({
            plugins: [
                url(),
                emoji()
            ]
        }

    ))
}


