var app = new Vue({
    el: '#app',
    data() {
        return {
            value: 0,
            count: 0,
            isPlayable: false,
            animationFlame: 0
        }
    },
    methods: {
        play() {
            var vm = this;
            (function loop() {
                vm.count++;
                // 実質sleep
                if (vm.count % 50 == 0) {
                    vm.value++;
                    vm.count = 0;
                }
                vm.animateFrame = requestAnimationFrame(loop);
            }());
            this.isPlayable = true;
        },
        stop() {
            this.isPlayable = false;
            cancelAnimationFrame(this.animateFrame);
        },
        clearAll() {
            this.value = 0;
            this.count = 0;
            this.stop();
            this.animateFrame = 0;
        }
    }
})
