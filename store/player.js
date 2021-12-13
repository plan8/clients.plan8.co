export const state = () => ({
    playBackState: 1, //loading, playing, paused, stopped
    playbackStates: {
        LOADING: 0,
        STOPPED: 1,
        PLAYING: 2,
        PAUSED: 3,
    },
    currentTume: 0,
    item: {
        id:0,
        stems: []
    },
    itemsCue: [],
    currentStem: {
        key: '0'
    },
    useTone: false,
    showFooter: false,
    targetPosition: 0
});

export const mutations = {
    SET_PLAYBACKSTATE(state, payload) {
        state.playBackState = payload;
    },

    SET_SHOWFOOTER(state, payload) {
        state.showFooter = payload;
    },

    SET_PREVIOUS(state, payload) {
        let listItems = state.itemsCue
        
        let currentIndex;
        if (listItems.indexOf(state.item) !== -1) {
            currentIndex = listItems.indexOf(state.item) - 1
        } else {
            currentIndex = 0
        }
        console.log('currentIndex: ', currentIndex);
         //if (currentIndex <= 0)  return;

         if (currentIndex > -1) {
            state.item = listItems[(currentIndex % listItems.length)];
            state.currentStem = state.item.stems[0]
         }
           
    
        // let listItems = state.itemsCue;
        // let currentIndex = listItems.indexOf(state.item);
        // console.log('currentIndex: ', currentIndex);
        // if (currentIndex <= 0) {
        //     return;
        // } else {
        //     state.item = listItems[currentIndex - 1];
        //     console.log('state.item: ', state.item);
        //     state.currentStem.currentStem = state.item.stems[0]
        // }
    },

    SET_NEXT(state, payload) {
        let listItems = state.itemsCue
        
        let currentIndex;
        if (listItems.indexOf(state.item) !== -1) {
            currentIndex = listItems.indexOf(state.item) + 1
        } else {
            currentIndex = 0
        }
        state.item = listItems[(currentIndex % listItems.length)];
        state.currentStem = state.item.stems[0]
    },

    SET_ITEM(state, payload) {
        
        state.item = payload;
        state.currentStem = payload.stems[0]
      
    },

    SET_USETONE(state, payload) {
        state.useTone = payload;
    },

    SET_ITEMSCUE(state, payload) {
        state.itemsCue = payload;
    },

    SET_CURRENTTIME(state, payload) {
        state.currentTume = payload;
    },

    SET_TARGETPOSITION(state, payload) {
        state.targetPosition = payload;
    }
};

export const actions = {
    logoutAndReset({ commit, state }, payload) {

    }
};
