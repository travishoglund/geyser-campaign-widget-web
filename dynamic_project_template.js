(function() {
    var dynamicPayload = DYNAMIC_PAYLOAD;

    // Add in the stylesheets
    var styleSheet = document.getElementById('geyser-campaign-styles');
    if(!styleSheet) {
        var geyserStyleSheet = document.createElement('style');
        geyserStyleSheet.setAttribute("id", "geyser-campaign-styles");
        geyserStyleSheet.innerHTML = ".geyser { background: #FFF; border-radius: 15px; box-sizing: border-box; color: #222529; display: block; font-family: 'Inter',sans-serif; font-weight: 500; max-width: 418px; padding: 18px 22px; width: 100%; } .geyser__inner { color: inherit; text-decoration: none; } .geyser__title { font-size: 21px; font-weight: 700; margin-bottom: 12px; } .geyser__meta { align-items: center; display: flex; } .geyser__progress { width: 25%; } .geyser__meta-details { flex: 1; flex-direction: column; padding-left: 16px; } .geyser__meta-amount { align-items: center; color: #03A88A; display: flex; font-family: 'Courier Prime', monospace; font-size: 34px; font-weight: 600; margin-bottom: 8px; margin-left: -6px; } .geyser__meta-amount-symbol { width: 22px; } .geyser__meta-description { color: #777; font-size: 12px; font-weight: 400; letter-spacing: 0.3px; } .geyser__creator { align-items: center; color: #333; display: flex; font-size: 15px; font-weight: 700; margin-top: 12px; } .geyser__creator img { border-radius: 100%; display: block; height: 28px; margin: 0 4px; width: 28px; } .geyser__support { margin-top: 13px; } .geyser__support-title { font-size: 12px; margin-bottom: 5px; } .geyser__supporters { display: flex; flex-direction: row; padding-left: 6px; } .geyser__supporters img { border: 2px solid #FFF; border-radius: 100%; display: inline-block; height: 25px; width: 25px; } .geyser__supporters span { background: #f4f4f4; border: 2px solid #FFF; border-radius: 100%; display: inline-block; height: 25px; line-height: 25px; font-size: 10px; text-align: center; width: 25px; } .geyser__supporters > * { margin-left: -4px; } .geyser__progress-ring-circle { transition: 2s stroke-dashoffset; transform: rotate(-90deg); transform-origin: 50% 50%; }";
        document.body.appendChild(geyserStyleSheet);
    }
    var fontSheet = document.getElementById('geyser-campaign-fonts');
    if(!fontSheet) {
        var geyserFontSheet = document.createElement('style')
        geyserFontSheet.setAttribute("id", "geyser-campaign-fonts");
        geyserFontSheet.setAttribute("rel", "stylesheet");
        geyserFontSheet.setAttribute("href", "https://fonts.googleapis.com/css2?family=Courier+Prime:wght@400;600&family=Inter:wght@400;500&display=swap");
        document.body.appendChild(geyserFontSheet);
    }

    // Get the element ID to bind to
    var bindedElements = document.querySelectorAll("[data-geyser-campaign=\""+dynamicPayload.project.name+"\"]");

    // Find the relevant milestone
    var relevantMilestone;
    var milestoneNumber;
    var milestoneColors = ["#20ECC7", "#10CAA8", "#03A88A", "#00866D", "#006452", "#004236"];
    for(var i = 0; i < dynamicPayload.milestones.length; i++) {
        if(dynamicPayload.milestones[i].reached === false) {
           relevantMilestone = dynamicPayload.milestones[i];
           milestoneNumber = i + 1;
           break;
        }
    }
    var milestoneColor = milestoneColors[ milestoneNumber % 6 - 1 ];
    var previousMilestoneColor = milestoneNumber === 1 ? "#E9ECEF" : milestoneColors[ milestoneNumber % 6 - 2 ];

    // Calculate our Supporters
    var supportHTML = '';
    var contributorsHTML = '';
    for(var i = 0; i < Math.min(dynamicPayload.contributorsCount, 13); i++) {
        console.log(i);
        if(dynamicPayload.contributorsCount > i) {
            contributorsHTML += `<img src="${dynamicPayload.contributors.length > i ? dynamicPayload.contributors[i].imageUrl : dynamicPayload.anonymousProfiles[i].imageUrl}" />`;
        }
    }

    // Add bubble for over 13 contributors
    if(dynamicPayload.contributorsCount > 13) {
        contributorsHTML += `<span class="geyser__additional-supporters">+${dynamicPayload.contributorsCount - 13}</span>`;
    }

    // Create support section
    supportHTML = `
        <div class="geyser__support">
            <div class="geyser__support-title">
                Top Supporters
            </div>
            <div class="geyser__supporters">
                ${contributorsHTML}
            </div>
        </div>
    `;


    // Build our HTML as a string
    var innerHTML = `
        <div class="geyser">
            <a href="${dynamicPayload.project.url}" class="geyser__inner" target="_blank">
                <div class="geyser__title">
                    ${dynamicPayload.project.title}
                </div>
                <div class="geyser__meta">
                    <div class="geyser__progress" data-progress="${dynamicPayload.currentMilestonePercent}">
                        <svg
                           class="geyser__progress-ring"
                           width="92"
                           height="92">
                          <circle
                            stroke="${previousMilestoneColor}"
                            stroke-width="18"
                            fill="transparent"
                            r="36"
                            cx="46"
                            cy="46"/>
                          <circle
                            class="geyser__progress-ring-circle"
                            stroke="${milestoneColor}"
                            stroke-dashoffset="0"
                            stroke-width="18"
                            fill="transparent"
                            r="36"
                            cx="46"
                            cy="46"/>
                        </svg>
                    </div>
                    <div class="geyser__meta-details">
                        <div class="geyser__meta-amount">
                            <div class="geyser__meta-amount-symbol">
                                <svg viewBox="0 0 18 18" focusable="false" class="chakra-icon css-1msyvxp" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_899_62912)"><path d="M9.00176 17.9469C13.9447 17.9469 17.9518 13.9398 17.9518 8.99688C17.9518 4.05393 13.9447 0.046875 9.00176 0.046875C4.05881 0.046875 0.0517578 4.05393 0.0517578 8.99688C0.0517578 13.9398 4.05881 17.9469 9.00176 17.9469Z" fill="none"></path><path d="M11.4877 2.04457L10.3525 1.74316L9.83749 3.68295L10.9727 3.98436L11.4877 2.04457Z" fill="currentColor"></path><path d="M8.16105 14.5587L7.02588 14.2573L6.51083 16.1971L7.646 16.4985L8.16105 14.5587Z" fill="currentColor"></path><path d="M13.6942 7.74454L13.9956 6.60938L5.90156 4.46025L5.60016 5.59542L13.6942 7.74454Z" fill="currentColor"></path><path d="M12.9032 10.7401L13.2046 9.60498L5.11055 7.45586L4.80914 8.59103L12.9032 10.7401Z" fill="currentColor"></path><path d="M12.1283 13.6552L12.4297 12.52L4.33564 10.3709L4.03424 11.5061L12.1283 13.6552Z" fill="currentColor"></path></g><defs><clipPath id="clip0_899_62912"><rect width="18" height="18" fill="none"></rect></clipPath></defs></svg>
                            </div>
                            ${relevantMilestone.amount.toLocaleString()}
                        </div>
                        <div class="geyser__meta-description">
                            ${dynamicPayload.currentMilestonePercent}% of Milestone ${milestoneNumber}: ${relevantMilestone.description}
                        </div>
                    </div>
                </div>
                <div class="geyser__creator">
                    <span>by</span>
                    <span><img src="${dynamicPayload.creator.imageUrl}" /></span>
                    <span>${dynamicPayload.creator.username}</span>
                </div>
                ${supportHTML}
            </a>
        </div>
    `;

    // Add the HTML inside our bound element targets
    for(var i = 0; i < bindedElements.length; i++) {
        if(!bindedElements[i].innerHTML) {
            bindedElements[i].innerHTML = innerHTML;
            var circle = bindedElements[i].querySelector('.geyser__progress-ring-circle');
            var radius = circle.r.baseVal.value;
            var circumference = radius * 2 * Math.PI;
            circle.style.strokeDasharray = `${circumference} ${circumference}`;
            circle.style.strokeDashoffset = `${circumference}`;
        }
    }

    // Scroll listener
    document.addEventListener("scroll", (event) => {
        checkVisibility();
    });

    // Trigger a fake scroll to simulate page load
    checkVisibility();

    /**
     * Checks if our bound elements are in the viewport of the page
     */
    function checkVisibility() {
        for(var i = 0; i < bindedElements.length; i++) {
            if(bindedElements[i].classList.contains('geyser--inactive') && isInViewport(bindedElements[i])) {
                triggerAnimation(bindedElements[i]);
                bindedElements[i].classList.remove("geyser--inactive");
            }
        }
    }

    /**
     * Checks if an element is visible in the viewport
     * @param element
     * @returns {boolean}
     */
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    /**
     * Triggers the campaign progress animation
     */
    function triggerAnimation(element) {
        var circle = element.querySelector('.geyser__progress-ring-circle');
        var offset = circumference - dynamicPayload.currentMilestonePercent / 100 * circumference;
        circle.style.strokeDashoffset = offset;
    }


})();