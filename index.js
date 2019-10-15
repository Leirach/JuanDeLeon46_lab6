let response
let videos = $("#videos")
let q = ""
let prevPage = ""
let nextPage = ""

function displayResults(items)
{
    videos.empty()
    for (var i=0; i<items.length; i++){
        let link = $("<a href=\"https://www.youtube.com/watch?v=" + items[i].id.videoId + "\"><div> </div><a/>")
        let div  = link.find("div")
        div.append($("<h3>" + items[i].snippet.title + "</h3>"))
        div.append($("<img src=\"" + items[i].snippet.thumbnails.default.url + "\">"))
        videos.append(link)
    }

}

$(":button").click(function(event) 
{
    event.preventDefault()
    var pageToken = ""

    switch ($(this).attr("id")) {
        case "searchButton":
            q = $("#input").val()
            break
        case "next":
            pageToken = nextPage
            break
        default:
            pageToken = prevPage
            break
    }
        

    $.ajax({
        url: "https://www.googleapis.com/youtube/v3/search",
        method: "GET",
        data: {
                "key": "[GOOGLE API KEY]",
                "part": "id,snippet",
                "q": q,
                "maxResults": 10,
                "pageToken": pageToken
              }, //info sent to API
        dataType: "json", //return type of the response
        contentType: "application/json", //type of data in requests
        success: function(responseJson) {
            response = responseJson
            nextPage = response.nextPageToken
            prevPage = response.prevPageToken
            displayResults(responseJson.items)
        },
        error: function(error) {
            console.log("no videos found")
        }
    })
})

