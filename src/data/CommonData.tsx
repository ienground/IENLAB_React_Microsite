import icAndroid from "../assets/icon/ic_android.svg";
import icWeb from "../assets/icon/ic_web.png";
import icCalarm from "../assets/icon/ic_calarm.png";
import icBlogPlanner from "../assets/icon/ic_blogplanner.png";
import icTetrisRPG from "../assets/icon/ic_tetris_rpg.png";
import backgroundCalarm from "../assets/background_calarm.png";
import backgroundTetris from "../assets/image/img_background_tetris_rpg.png";
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
                iosLink: "",
                gitLink: ""
            },

        ]
    },
    {
        title: "Web",
        icon: icWeb,
        content: [
            {
                icon: icTetrisRPG,
                title: "테트리스 RPG",
                content: "ATC 2021 출품작",
                background: backgroundTetris,
                showIntro: true,
                page: "/tetris",
                aosLink: "",
                iosLink: "",
                gitLink: ""
            }
        ]
    }
];


