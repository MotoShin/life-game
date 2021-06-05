var app = new Vue({
    el: '#app',
    data() {
        return {
            values: [],
            count: 0,
            isPlayable: false,
            animationFlame: 0,
            liveStyle: {
                background: '#00ff00'
            }
        }
    },
    mounted() {
        var arr = new Array(65);
        for (let i = 0; i < 65; i++) {
            arr[i] = new Array(65).fill(0);
        }
        this.values = arr;
        Vue.set(this.values[0], 0, 1);
    },
    methods: {
        play() {
            var vm = this;
            (function loop() {
                vm.count++;
                // 実質sleep
                if (vm.count % 50 == 0) {
                    var arr = JSON.parse(JSON.stringify(vm.values))
                    for (let row = 0; row < arr.length; row++) {
                        for (let col = 0; col < arr[row].length; col++) {
                            if (arr[row][col] == 1) {
                                tempRow = row;
                                tempCol = col + 1;
                                if (tempCol == arr[row].length) {
                                    tempRow++;
                                    if (tempRow == arr.length) {
                                        tempRow = 0;
                                    }
                                    tempCol = 0;
                                }
                                Vue.set(vm.values[tempRow], tempCol, 1);
                                Vue.set(vm.values[row], col, 0);
                            }
                        }
                    }                
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
            this.init();
            this.count = 0;
            this.stop();
            this.animateFrame = 0;
        },
        init() {
            var arr = new Array(65);
            for (let i = 0; i < 65; i++) {
                arr[i] = new Array(65).fill(0);
            }
            this.values = arr;
            Vue.set(this.values[0], 0, 1);
        }
    }
})
