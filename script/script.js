var app = new Vue({
    el: '#app',
    data() {
        return {
            count: 0,
            isPlayable: false,
            animationFlame: 0,
            nowTime: 0,
            diffTime: 0,
            startTime: 0
        }
    },
    methods: {
        setSubtractStartTime(time) {
            var time = typeof time !== 'undefined' ? time : 0;
            this.startTime = Math.floor(performance.now() - time);
        },
        play() {
            var vm = this;
            vm.setSubtractStartTime(vm.diffTime);
            (function loop() {
                vm.count += 1;
                vm.nowTime = Math.floor(performance.now());
                vm.diffTime = vm.nowTime - vm.startTime;
                vm.animateFrame = requestAnimationFrame(loop);
            }());
            this.isPlayable = true;
        },
        stop() {
            this.isPlayable = false;
            cancelAnimationFrame(this.animateFrame);
        },
        clearAll() {
            this.count = 0;
            this.nowTime = 0;
            this.diffTime = 0;
            this.startTime = 0;
            this.stop();
            this.animateFrame = 0;
        }
    }
})
