(() => {

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
            opacitySettingsValues: {	// 투명도 애니메이션 셋팅 값들
                message0_opacity_in: [0, 1],
                message1_opacity_in: [0, 1],
                img_opacity_in: [0, 1]
            },
            tanslateYSettingsValues: {	// 위치 애니메이션 셋팅 값들
                message0_translateY_in: [20, 0],
                message1_translateY_in: [20, 0],
                img_translateY_in: [20, 0]
            }
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

    const section0Animation = function()
    {
        let opValue = 0;
        let yValue = 20;
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

            if((opValue >= 1) && (yValue <= 0))
            {
                clearInterval(tid);
                opValue = 0;
                yValue = 20;
            }
        }, 40);

    }

    // playAnimation : section에 맞는 애니메이션 실행
    //  - parameter : x
    //  - return : x
    const playAnimation = function()
    {
        section0Animation();
    }


    //////////////////////////////////////////////////////
    // 이벤트 핸들러

    // 로딩된후에 발생되는 이벤트!
    window.addEventListener("load", () => {

        // setLayout() : 섹션에 대한 높이를 설정
        setLayout();

        // playAniamtion() : section에 맞는 애니메이션 실행
        playAnimation();
    });
})();