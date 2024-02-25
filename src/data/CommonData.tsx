import icAndroid from "../assets/icon/ic_android.svg";
import icCalarm from "../assets/icon/ic_calarm.png";
import icBlogPlanner from "../assets/icon/ic_blogplanner.png";
import backgroundCalarm from "../assets/background_calarm.png";
export const appList = [
    {
        title: "Android",
        icon: icAndroid,
        content: [
            {
                icon: icCalarm,
                title: "캘람",
                content: "내 일정을 아는 똑똑한 알람",
                background: backgroundCalarm,
                showIntro: true,
                page: "/calarm",
                aosLink: "zone.ien.calarm",
                iosLink: "ddd"
            },
            {
                icon: icBlogPlanner,
                title: "블로그 플래너",
                content: "1일 1포스팅",
                background: backgroundCalarm,
                showIntro: false,
                page: "/blogplanner",
                aosLink: "net.ienlab.blogplanner",
                iosLink: ""
            }
        ]
    }
];


