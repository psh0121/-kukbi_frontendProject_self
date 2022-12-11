(() => {

    let currentScrollY = 0;         // 현재 scrollY 위치값
    let currentSection = 0;         // 현재 섹션 위치
    let sectionYOffset = 0;         // 현재 섹션에 따른 scrollY 상대값

    // sectionSet : n번째 섹션에 대한 각종 정보 집합
    const sectionSet = [
        // section0
        {
            height: 0,
            multiplyValue: 0.9,
            elemInfo: {
                section: document.querySelector('.section0'),
                message: [
                    document.querySelector('.section0-contents-message0'),
                    document.querySelector('.section0-contents-message1')
                ],
                img: document.querySelector('.section0-contents-img')
            },
            opacitySettingsValues: [0, 1],	// 투명도 애니메이션 셋팅 값들
            tanslateYSettingsValues: [20, 0],	// 위치 애니메이션 셋팅 값들
        },

        // section1
        {
            height: 0,
            multiplyValue: 3,
            elemInfo: {
                section: document.querySelector('.section1')
            }
        },

        // section2
        {
            height: 0,
            multiplyValue: 4,
            elemInfo: {
                section: document.querySelector('.section2')
            }
        },
    ];

    //////////////////////////////////////////////////////
    // 일반함수

    // setLayout : window창 크기에 대한 section 사이즈 영역 설정
    //  - parameter : x
    //  - return : x
    const setLayout = function() 
    {
        for(let i = 0; i < sectionSet.length; i++)
        {
            sectionSet[i].height = window.innerHeight * sectionSet[i].multiplyValue;
            sectionSet[i].elemInfo.section.style.height = `${sectionSet[i].height}px`;
        }
    }

    // getCurrentSection : scrollY 위치에 따른 현재 섹션위치 구하기
    //  - parameter : x
    //  - return : 현재 섹션 값
    const getCurrentSection = function()
    {
        let currentSection = 0;
        let sum = 0;
        let index = 0;

        for(let i = 0; i < sectionSet.length; i++)
        {
            sum = sum + sectionSet[i].height;

            if(currentScrollY <= sum)
            {
                currentSection = index;
                break;
            }
            index++;
        }
    
        return currentSection;
    }

    // getSectionYOffset : 현재 섹션 위치에 따른 scrollY의 상대값 구하기
    //  - parameter : x
    //  - return : 현재 섹션 위치에 따른 scrollY 상대값
    const getSectionYOffset = function()
    {
        let yOffset = currentScrollY;

        for(let i = 0; i < currentSection; i++)
        {
            yOffset = yOffset - sectionSet[i].height;
        }
        
        return yOffset;
    }

    // section0Animation : section0에서 발생되는 애니메이션
    //  - parameter : x
    //  - return : x
    const section0Animation = function()
    {
        let opValue = sectionSet[0].opacitySettingsValues[0];
        let yValue = sectionSet[0].tanslateYSettingsValues[0];
        let tid;

        tid = setInterval(() => {
            sectionSet[0].elemInfo.message[0].style.opacity =  opValue;
            sectionSet[0].elemInfo.message[1].style.opacity =  opValue;
            sectionSet[0].elemInfo.img.style.opacity =  opValue;
            opValue += 0.05;
            
            sectionSet[0].elemInfo.message[0].style.transform = `translateY(${yValue}%)`;
            sectionSet[0].elemInfo.message[1].style.transform = `translateY(${yValue}%)`;
            sectionSet[0].elemInfo.img.style.transform = `translateY(${yValue}%)`;
            yValue --;

            if((opValue >= sectionSet[0].opacitySettingsValues[1]) && 
               (yValue <= sectionSet[0].tanslateYSettingsValues[1]))
            {
                clearInterval(tid);
                opValue = 0;
                yValue = 20;
            }
        }, 40);
    }

    // loadAnimation : load된 이후에 발생될 애니메이션
    //  - parameter : x
    //  - return : x
    const loadAniamtion = function()
    {
        section0Animation();
    }

    // playAnimation : section에 맞는 애니메이션 실행
    //  - parameter : x
    //  - return : x
    const playAnimation = function()
    {
        
    }


    //////////////////////////////////////////////////////
    // 이벤트 핸들러

    // 로딩된후에 발생되는 이벤트!
    window.addEventListener("load", () => {

        currentScrollY = window.scrollY;
        currentSection = getCurrentSection();
        sectionYOffset = getSectionYOffset();

        setLayout();

        loadAniamtion();
    });

    // 스크롤을 진행했을시에 발생되는 이벤트!
    window.addEventListener("scroll", () => {
        currentScrollY = window.scrollY;
        currentSection = getCurrentSection();
        sectionYOffset = getSectionYOffset();

        playAnimation();
    });
})();