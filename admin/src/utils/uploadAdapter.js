import apiURL from "../utils/env"

export default class UploadAdapter {
    constructor(loader) {
        // The file loader instance to use during the upload.
        this.loader = loader
    }

    // Starts the upload process.
    upload() {
        //const imgURL = process.env.VUE_APP_API + "/img"
        return this.loader.file
            .then(uploadedFile => {

                return new Promise((resolve, reject) => {
                    const fd = new FormData();
                    fd.append('file', uploadedFile)

                    fetch(apiURL + "/upload", { method: "POST", body: fd }).then(async res => {
                        const json = await res.json();
                        resolve({ default: process.env.NODE_ENV == "production" ? "VUE_APP_API" : process.env.VUE_APP_API + "/img/" + json.filename })
                    }).catch(err => {
                        console.log(err)
                        reject();
                    })

                });


                // return new Promise((resolve, reject) => {
                //     const fd = new FormData();
                //     fd.append('file', uploadedFile);

                //     if (this.axios)
                //         this.axios
                //             .$post(imgURL + `/upload/`, fd) //, {headers: { Authorization: this.token }} ${this.postId}
                //             .then(response => {
                //                 if (response) {
                //                     const w = parseInt(response.width);

                //                     // save image
                //                     // this.axios.$post(`/api/post-image/${this.postId}`, { filename: response.filename, width: response.width, height: response.height })

                //                     const r = {
                //                         'default': imgURL + '/get/' + response.filename,
                //                         [w]: imgURL + '/get/' + response.filename + '/' + w,
                //                         //'360': imgURL + '/files/get/' + response.filename + '/360',
                //                         '720': imgURL + '/get/' + response.filename + '/720',
                //                         '1080': imgURL + '/get/' + response.filename + '/1080',
                //                         '1440': imgURL + '/get/' + response.filename + '/1440'
                //                     };

                //                     resolve(Object.keys(r).filter(key => key === 'default' || parseInt(key) <= w).reduce((obj, key) => {
                //                         obj[key] = r[key];
                //                         return obj;
                //                     }, {}));
                //                 } else {
                //                     reject('response.data.message');
                //                 }
                //             }).catch(response => {
                //                 console.log("err: ")
                //                 console.log(response)
                //                 reject('Upload failed');
                //             });
                // });
            });
    }

    abort() {
        // Reject the promise returned from the upload() method.
    }
}