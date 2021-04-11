// $(window).load(function(){
//     $(document).scroll(function () {
//         var y = $(this).scrollTop();
//         if (y > 1013) {
//             $('#machine1swap').fadeIn('slow');
//         }
//         else {$('#machine1swap').fadeOut('fast')};

//         if (y > 2119) {
//             $('#machine2swap').fadeIn('slow');
//         }
//         else {$('#machine2swap').fadeOut('fast')};

//         if (y > 3216) {
//             $('#machine3swap').fadeIn({});
//         }
//         else {$('#machine3swap').fadeOut('fast')};
//     });
// });
window.onload = function() {
    document.onscroll = function () {
        var y = window.scrollY;
        var firstImageMax = maxWindowHeight

        canvas.style.opacity = 1 - y / firstImageMax;

        // console.log(y)
    }
}

const maxWindowHeight = window.screen.availHeight - (window.outerHeight - window.innerHeight)

// const canvas = document.getElementById("bg-canvas");
// const context = canvas.getContext("2d");

// const img = new Image()
// img.src = 'img/main-bg.jpg'
// canvas.width  = window.innerWidth;
// canvas.height = window.innerHeight;
// img.onload=function(){
//     var hRatio = canvas.width / img.width    ;
//     var vRatio = canvas.height / img.height  ;
//     var ratio  = Math.max ( hRatio, vRatio );
//     context.drawImage(img, 0,0, img.width, img.height, 0,0,img.width*ratio, img.height*ratio); 
// }


function createElement(element, opts={}){
    let e = document.createElement(element);
    for(let key of Object.keys(opts)){
        if(key == "attributes"){
            for(let attr of Object.keys(opts[key])){
                e.setAttribute(attr, opts[key][attr]);
            } 
        }
        else{
            e[key] = opts[key];
        }
    }
    return e;
}

const BadgeColors = {
    Languages: {
        list: ["c++", "JavaScript", "python", "Java", "html", "css", "Docker", "Arduino", "PostgreSQL", "VHDL"],
        className: "bg-info"
    },
    Frameworks: {
        list: ["Node.js", "React.js", "JUCE"],
        className: "bg-success"
    },
    skills: {
        list: ["algorithms", "communication"],
        className: "bg-warning"
    },
    group: {
        list: ["Game Development", "Web Development", "Database Development", "Server Developemnt", "Server-Client", "Networking", "Audio Programming", "Android Development", "Full Stack Web Development",
                "Hardware"],
        className: "bg-secondary"
    },
    special: {
        list: ["Game Engine Development", "Hackathon Semi-Finalist"],
        className: "bg-danger"
    }
}
// const Skills = ["Node.js", "React.js"]

function createProjectBox(projectTitle, descriptionText, projectURL, tagArr, imageSrc){
    let colBox = createElement("div", {
        className: "col-md-4 px-0 mb-4 projectbox mx-auto",
    })
//     <a href="#!">
//     <div class="mask" style="background-color: rgba(251, 251, 251, 0.2)"></div>
//   </a>
    // let link = createElement("a", {
    //     href: '#'
    // })
    // let linkMask = createElement("div", {
    //     className: "mask",
    //     style: "background-color: rgba(251, 251, 251, 0.2)"
    // })
    // link.appendChild(linkMask);
    // colBox.appendChild(link)
    let box = createElement("div", {
        className: "card card-image",
        attributes: {
            style:"background-image: url('" + imageSrc + "'); background-size: 100% 100%;"
        }
    })
    let innerBox = createElement("div", {
        className: "text-white text-center d-flex align-items-center rgba-projectbox pt-5 pb-4 px-4"
    })
    let content = createElement("div")
    let title = createElement("h3", {
        className: "mb-4 mt-4 font-weight-bold"
    })
    let titleString = createElement("strong", {
        innerText: projectTitle
    })
    let description = createElement("p", {
        innerText: descriptionText
    })
    // <a class="btn btn-outline-white btn-sm">
    //                             <i class="fas fa-clone left"></i> View project</a>
    //                         </div>
    let projectLink = createElement("a", {
        className: "btn btn-outline-white btn-sm",
        attributes: {
            href: projectURL,
        }
    })
    let smallIcon = createElement("i", {
        className: "fas fa-clone left",
    })
    projectLink.appendChild(smallIcon)
    projectLink.innerText += " View " + projectTitle

    let badgeDiv = createElement("div", {
        className: "mt-2"
    });
    for(let tag of tagArr){
        let colorClassName = "bg-primary";
        for(let key of Object.keys(BadgeColors)){
            if(BadgeColors[key].list.includes(tag)) {
                // console.log("s")
                colorClassName = BadgeColors[key].className;
            }
        }
        let badge = createElement("span", {
            className: "badge rounded-pill p-2 m-1 " + colorClassName,
            innerText: tag
        })
        // console.log(badge)
        badgeDiv.appendChild(badge)
    }

    colBox.addEventListener("mouseenter", () => {
        innerBox.classList.remove("rgba-projectbox")
        innerBox.classList.add("rgba-projectbox-hover")
        // box.style.backgroundSize = "100% 100%"
    })
    colBox.addEventListener("mouseleave", () => {
        innerBox.classList.remove("rgba-projectbox-hover")
        innerBox.classList.add("rgba-projectbox")
        // box.style.backgroundSize = "100% 100%"

    })

    content.appendChild(title)
    title.appendChild(titleString)
    content.appendChild(description)
    content.appendChild(projectLink)
    content.appendChild(badgeDiv)
    colBox.appendChild(box);
    box.appendChild(innerBox);
    innerBox.appendChild(content)
    return colBox;
}

class ProjectBox {
    constructor(title, description, projectURL, tagArr, imageSrc){
        this.div = createProjectBox(title, description, projectURL, tagArr, imageSrc);
    }


}