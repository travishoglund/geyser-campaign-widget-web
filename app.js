const express = require('express')
const app = express()
const port = 3000
const fs = require('fs');

app.get('/', (req, res) => {
    res.send(
        `<html><body>
            <div data-geyser-campaign="bitcoinlightningatm" class="geyser--inactive"></div>
            <script type="text/javascript" src="http://localhost:3000/widgets/project/bitcoinlightningatm?type=web"></script>
            
            <br><br>
            
            <div data-geyser-campaign="2" class="geyser--inactive"></div>
            <script type="text/javascript" src="http://localhost:3000/widgets/project/2?type=web"></script>
            
            <br><br>
            
            <div data-geyser-campaign="3" class="geyser--inactive"></div>
            <script type="text/javascript" src="http://localhost:3000/widgets/project/3?type=web"></script>
            
            <br><br>
            
            <div data-geyser-campaign="4" class="geyser--inactive"></div>
            <script type="text/javascript" src="http://localhost:3000/widgets/project/4?type=web"></script>
            
            <br><br>
            
            <div data-geyser-campaign="5" class="geyser--inactive"></div>
            <script type="text/javascript" src="http://localhost:3000/widgets/project/5?type=web"></script>
            
            <br><br>
            
            <h1>Original design</h1>
            <img style="width: 416px; display: block;" src="https://tortch.co/temp/design-reference.png" />
            
        </body></html>`
    );
})

app.get('/widgets/project/:projectname', function(req, res) {
    var projectName = req.params.projectname;
    var type = req.query.type || "raw"; // valid values are: "web" or "raw" (default)

    /*
     * This is where you will make the database calls to populate the payload (it must match this structure)
     * Call database with projectId
     */
    var payload = {
        project: {
            name: projectName,
            title: "Bitcoin ATM Project",
            balance: "1225000",
            url: "https://geyser.fund/project/bitcoinlightningatm"
        },
        creator: {
            imageUrl: "https://pbs.twimg.com/profile_images/1376176739970293770/n146TmbC_400x400.jpg",
            username: "thoglund",
        },
        contributorsCount: 15,
        contributors: [
            {imageUrl: "https://pbs.twimg.com/profile_images/1570918965601505282/SOApRCif_normal.jpg"},
            {imageUrl: "https://pbs.twimg.com/profile_images/935221879899598849/aK4OCNVb_normal.jpg"},
            {imageUrl: "https://pbs.twimg.com/profile_images/1445951516871905285/u7Lqbxq7_normal.jpg"},
            {imageUrl: "https://pbs.twimg.com/profile_images/1143932858/me_normal.gif"},
            {imageUrl: "https://pbs.twimg.com/profile_images/1654248089379545090/oHx_hKCj_normal.jpg"},
            {imageUrl: "https://nostr.build/i/039a07c988dbc7d1dffb672f543ff86f9f3878ef450bbaf8c01de478235125fb.jpg"},
            {imageUrl: "https://www.thebtccourse.com/wp-content/uploads/2023/02/n8han_social_media_pic.jpg"},
            {imageUrl: "https://pbs.twimg.com/profile_images/1531963326007238661/-RqwQXlB_normal.jpg"},
            {imageUrl: "https://pbs.twimg.com/profile_images/1468186122773745668/xD4iVF7J_normal.jpg"},
            {imageUrl: "https://pbs.twimg.com/profile_images/1505316167702892545/2bB0-U7n_normal.jpg"},
        ],
        currentMilestonePercent: Math.floor(Math.random() * (90 - 40 + 1) + 40), // this is just to randomize testing
        milestones: [
            {name: "Milestone 1", description: "Design Circuitry", amount: 50000, reached: true},
            {name: "Milestone 2", description: "Create Prototype", amount: 50000, reached: true},
            {name: "Milestone 3", description: "Ready for Production", amount: 45375, reached: false},
        ],
        anonymousProfiles: [
            {imageUrl: "https://storage.googleapis.com/geyser-projects-media/orbs/ellipse_51.png"},
            {imageUrl: "https://storage.googleapis.com/geyser-projects-media/orbs/ellipse_52.png"},
            {imageUrl: "https://storage.googleapis.com/geyser-projects-media/orbs/ellipse_53.png"},
            {imageUrl: "https://storage.googleapis.com/geyser-projects-media/orbs/ellipse_54.png"},
            {imageUrl: "https://storage.googleapis.com/geyser-projects-media/orbs/ellipse_55.png"},
            {imageUrl: "https://storage.googleapis.com/geyser-projects-media/orbs/ellipse_56.png"},
            {imageUrl: "https://storage.googleapis.com/geyser-projects-media/orbs/ellipse_57.png"},
            {imageUrl: "https://storage.googleapis.com/geyser-projects-media/orbs/ellipse_58.png"},
            {imageUrl: "https://storage.googleapis.com/geyser-projects-media/orbs/ellipse_59.png"},
            {imageUrl: "https://storage.googleapis.com/geyser-projects-media/orbs/ellipse_60.png"},
            {imageUrl: "https://storage.googleapis.com/geyser-projects-media/orbs/ellipse_61.png"},
            {imageUrl: "https://storage.googleapis.com/geyser-projects-media/orbs/ellipse_62.png"},
            {imageUrl: "https://storage.googleapis.com/geyser-projects-media/orbs/ellipse_63.png"}
        ]
    };

    switch (type) {
        case 'web':
            // Stream the javascript
            var bufferTemplate = fs.readFileSync('./dynamic_project_template.js');
            var jsTemplate = bufferTemplate.toString();
            var out = jsTemplate.replace("DYNAMIC_PAYLOAD", JSON.stringify(payload));
            res.setHeader('content-type', 'text/javascript');
            res.write(out);
            res.end();
            break;
        default:
            res.json(payload);
    }
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})