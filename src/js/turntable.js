/**
 * Created by zhangxin on 2018/11/7.
 */
window.onload = function () {
    function $(domId) {
        return document.getElementById(domId);
    }
    var center_arrow = $('center_arrow'),
        turntable_arrow_number = $('turntable_arrow_number'),
        outer_element = document.getElementsByClassName('turntable-layout-outer'),
        transform_rotate_num = 1,//计数——记录已抽奖的次数
        rotate_timer_flag = false; //几率转盘是否在转动
    /**
     * 生成m-n之间的随机数
     * @param m 较小数值
     * @param n 较大数值
     * @returns {number}
     * floor 向下取整 返回的number值可能会等于m，一定不会等于n
     */
    function randomWining (m,n){
        return Math.floor(Math.random()*(m - n) + n);
    }

    /**
     * 抽奖按钮的事件
     */
    center_arrow.addEventListener("touchstart",function (e) {
        e.preventDefault();
        // 判断转盘是否在转动 && 剩余次数是否大于0
        if(!rotate_timer_flag && parseInt(turntable_arrow_number.innerText) > 0){
            rotate_timer_flag = true;
            turntable_arrow_number.innerText = (parseInt(turntable_arrow_number.innerText)-1)
            outer_element[0].style = 'transform: rotate('+ rotateWheel(randomWining(0,8)) +'deg)';
            transform_rotate_num+=1; //计数——每抽奖一次，加 1
            setTimeout(function () {
                rotate_timer_flag = false;
            },6000);
        }else if(!rotate_timer_flag && parseInt(turntable_arrow_number.innerText) === 0){
            /**
             * 如果抽奖次数用尽，弹出分享的窗口。
             */
            modalFun("share_modal");
        }
    });
    /**
     * ind [0-7]依次表示ul.turntable-ul里面的8个li。
     * @param ind
     * @returns {number}
     */
    function rotateWheel(ind){
        var rotateDeg = 0,
            transform_rotate2 = transform_rotate_num * 3600;
        switch (ind){
            case 0 :
                rotateDeg = transform_rotate2 + 67.5; //再接再厉
                break;
            case 1 :
                rotateDeg = transform_rotate2 + 22.5; //免单券
                break;
            case 2 :
                rotateDeg = transform_rotate2 + -22.5; //再接再厉
                break;
            case 3 :
                rotateDeg = transform_rotate2 + -67.5; //再接再厉
                break;
            case 4 :
                rotateDeg = transform_rotate2 + -112.5; //再接再厉
                break;
            case 5 :
                rotateDeg = transform_rotate2 + -157.5; //再接再厉
                break;
            case 6 :
                rotateDeg = transform_rotate2 + -202.5; //再接再厉
                break;
            case 7 :
                rotateDeg = transform_rotate2 + -247.5; //再接再厉
                break;
        }
        return rotateDeg;
    }

    /**
     * 中奖名单滚动
     */
    var z = 0,//向上滚动translateY值
        timer = null;
    function scrollUp() {//向上滚动
        var wining_list = $("wining_list"),
            wining_list_height = wining_list.clientHeight,
            wining_list_parent_height = wining_list.parentNode.clientHeight;
        clearInterval(timer);
        timer = setInterval(function () {
            if(wining_list_height<=(z+wining_list_parent_height)){
                try {
                    z = 0;
                    clearInterval(timer);
                    scrollUp();
                } catch (e){
                    console.warn("error");
                    clearInterval(timer);
                }
            }
            wining_list.style = 'transform: translateY('+ -(z++) +'px)';
        },100);
    }
    scrollUp();
    /**
     * 打开模态窗口
     * @type {*}
     */
    // var modal_btn = document.querySelector('[data-toggle="modal"]');
    // console.log(modal_btn);
    var activity_list_btn = $("activity_list_btn");
    activity_list_btn.addEventListener("touchstart",function () {
        var modalId = this.getAttribute('data-target');
        modalFun(modalId);
    });
    /**
     * 打开模态窗口，以及关闭事件绑定，关闭时触发callback方法
     * @param modalId 莫泰窗口的ID
     * @param callback 关闭时触发的方法
     *
     * 用法示例如下：
     * modalFun("login_modal",function(){alert(1)});
     *
     * 按钮上带有 close/footer-close类的，点击会自动触发关闭事件
     * 如不需要，请自行删除
     */
    window.modalFun = function (modalId,callback) {
        var modal = $(modalId)
            modal.className ='modal open';
            document.body.className = 'modal-open';
        if(modal.querySelector('.close')){
            modal.querySelector('.close').addEventListener("touchstart",b);
            function b() {
                if(typeof callback == 'function'){
                    callback();
                }
                document.body.className='';
                this.parentElement.className = 'modal';
                this.removeEventListener("touchstart",b);//关闭后解除事件
            }
        }
        if(modal.querySelector('.footer-close')) {
            modal.querySelector('.footer-close').addEventListener("touchstart", a);
            function a() {
                if (typeof callback == 'function') {
                    callback();
                }
                document.body.className='';
                modal.className = 'modal';
                this.removeEventListener("touchstart", a);//关闭后解除事件
            }
        }
    };
    var yzm_btn
};