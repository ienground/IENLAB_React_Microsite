import icAndroid from "../assets/icon/ic_android.svg";
import icCalarm from "../assets/icon/ic_calarm.png";
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
                iosLink: ""
            }
        ]
    }
];


