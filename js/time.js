window.onload=function(){
    function ifAddZero(oTime){
        return (oTime<10) ? ('0' + oTime): ('' + oTime);
    }
    function tick(){
        var oTime = document.getElementById('Time');
        var oDate = new Date();
        var oFullTime = ifAddZero(oDate.getHours())+':'+ifAddZero(oDate.getMinutes())+':'+ifAddZero(oDate.getSeconds());
        const NowDate = oDate.getFullYear() + '年' + (oDate.getMonth() + 1) + '月' + oDate.getDate() + '日';
        const NowDay = (function (){switch(oDate.getDay())
        {
            case 1: return '星期一';
            case 2: return '星期二';
            case 3: return '星期三';
            case 4: return '星期四';
            case 5: return '星期五';
            case 6: return '星期六';
            case 0: return '星期日';
            default: return '';
        }
    }());
        oTime.innerHTML = NowDate + '<br>' + NowDay + '<br>' + oFullTime;
    }
    setInterval(tick,500);
    tick(); //保证刷新页面的情况下可以显示数字
};