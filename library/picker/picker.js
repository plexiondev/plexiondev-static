// Picker


// reading images
function urlToPromise(url) {
    return new Promise(function(resolve, reject) {
        JSZipUtils.getBinaryContent(url, function (err, data) {
            if(err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
}

function compile() {
    // init
    var zip = new JSZip();

    // generate folders
    var textures = zip.folder("assets/minecraft/textures");
    var block = zip.folder("assets/minecraft/textures/block");

    // pack.mcmeta
    var promise = $.get("pack.mcmeta?a=" + Math.random())
    zip.file("pack.mcmeta", promise);

    // item1
    if (document.body.classList.contains("item1")) {
        block.file("grass_block_top.png", urlToPromise("item1/grass_block_top.png"), {binary: true, compression: "DEFLATE"});
    }
    if (document.body.classList.contains("item2")) {
        block.file("stone.png", urlToPromise("item2/stone.png"), {binary: true, compression: "DEFLATE"});
    }


    // save as file
    zip.generateAsync({type:"blob"})
    .then(function(content) {
        saveAs(content, "pack.zip");
    });
}