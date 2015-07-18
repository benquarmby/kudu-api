var fs = require("fs");

module.exports = function vfs(request) {
    return {
        getFile: function getFile(path, cb) {
            request("/api/vfs/" + path, function(err, response, body) {
                if (err) return cb(err);
                cb(null, body);
            });
        },
        listFiles: function listFiles(path, cb) {
            if ('/' !== path[path.length-1]) {
                path += '/';
            }
            request("/api/vfs/" + path, function(err, response, body) {
                if (err) return cb(err);
                cb(null, JSON.parse(body));
            });
        },
        uploadFile: function uploadFile(localPath, destPath, cb) {
            fs.createReadStream(localPath).pipe(request.put({
                uri: "/api/vfs/" + destPath,
                headers: {
                    "If-Match": "*"
                }
            }, function(err, response, body) {
                if (err) return cb(err);
                cb(null, body);
            }));
        },
        createDirectory: function createDirectory(path, cb) {
            if ('/' !== path[path.length-1]) {
                path += '/';
            }
            request.put("/api/vfs/" + path, function(err, response, body) {
                if (err) return cb(err);
                cb(null, body);
            });
        },
        deleteFile: function deleteFile(path, cb) {
            request.del("/api/vfs/" + path, function(err, response, body) {
                if (err) return cb(err);
                cb(null, body);
            });
        },
        deleteDirectory: function deleteDirectory(path, cb) {
            if ('/' !== path[path.length-1]) {
                path += '/';
            }
            request.del("/api/vfs/" + path, function(err, response, body) {
                if (err) return cb(err);
                cb(null, body);
            });
        }
    }
};