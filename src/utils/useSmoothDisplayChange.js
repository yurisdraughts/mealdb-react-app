import { useRef } from "react";
import '../assets/styles/useSmoothDisplayChange.scss';

export default function useSmoothDisplayChange({
    hide: {
        new: hideNewNumber = 0,
        old: hideOldArray = []
    } = {
        new: 0,
        old: []
    },
    show: {
        new: showNewNumber = 0,
        old: showOldArray = []
    } = {
        new: 0,
        old: []
    }
}) {
    const hideNewArray = [];
    for (let i = 0; i < hideNewNumber; i++) {
        hideNewArray.push(useRef(null));
    }
    const hideArray = [...hideOldArray, ...hideNewArray];

    const showNewArray = [];
    for (let i = 0; i < showNewNumber; i++) {
        showNewArray.push(useRef(null));
    }
    const showArray = [...showOldArray, ...showNewArray];

    const changeClassLists = (callback) => {
        hideArray.forEach(ref => { ref.current?.classList.add('hide'); });

        showArray.forEach(ref => { ref.current?.classList.add('show'); });
        showArray.forEach(ref => { ref.current?.classList.remove('display-none'); });

        setTimeout(() => {
            hideArray.forEach(ref => { ref.current?.classList.add('display-none'); });
            hideArray.forEach(ref => { ref.current?.classList.remove('hide'); });

            showArray.forEach(ref => { ref.current?.classList.remove('show'); });

            if (callback) callback();
        }, 300);
    };

    return {
        hide: hideNewArray,
        show: showNewArray,
        transition: changeClassLists
    };
}
