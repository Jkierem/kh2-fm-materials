const key = "may your heart be your guiding key";

const Storage = {
    save(data){
        window.localStorage.setItem(key,JSON.stringify(data))
    },
    load(){
        return JSON.parse(window.localStorage.getItem(key))
    }
}

export default Storage