

export default function (context, inject, store) {
    console.log('context: ', context);

    const helpers = {

        keyHandler(e) {
            console.log('e: ', e);
            if (e.keyCode == 27) {
                // ESC KEY
                store.commit("items/SET_SELECTEDITEMS", []);

            }

            if (e.target.nodeName === "INPUT" || e.target.nodeName === "TEXTAREA") {
                return;
            }
            if (
                ["Space", "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].indexOf(
                    e.code
                ) > -1
            ) {
                if (context.route.name == 'list-id') {
                    e.preventDefault();

                    let items = []

                    context.store.state.project.subProjects.forEach(sp => {
                        sp.items.forEach(item => {
                            items.push(item)
                        });

                    });
                    console.log('items: ', items);
                    context.store.commit("player/SET_ITEMSCUE", items);

                    switch (e.keyCode) {
                        case 32:
                            $nuxt.$emit("player-toggle");
                            break;
                        case 37:
                            $nuxt.$emit("audio-rev");
                            break;
                        case 39:
                            $nuxt.$emit("audio-ff");
                            break;
                        case 38:
                            context.store.commit("player/SET_PREVIOUS");
                            break;
                        case 40:
                            context.store.commit("player/SET_NEXT");
                            break;
                        default:
                            break;
                    }


                }


            }



        }



    };

    inject('helpers', helpers)





}