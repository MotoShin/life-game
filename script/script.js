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
        Vue.set(this.values[2], 4, 1);
        Vue.set(this.values[3], 5, 1);
        Vue.set(this.values[4], 3, 1);
        Vue.set(this.values[4], 4, 1);
        Vue.set(this.values[4], 5, 1);
    },
    methods: {
        play() {
            var vm = this;
            (function loop() {
                vm.count++;
                // 実質sleep
                if (vm.count % 50 == 0) {
                    var arr = new Array(vm.values.length + 2);
                    for (let i = 0; i < vm.values.length + 2; i++) {
                        arr[i] = new Array(vm.values[0].length + 2).fill(0);
                    }
                    for (let row = 0; row < vm.values.length; row++) {
                        for (let col = 0; col < vm.values[row].length; col++) {
                            arr[row + 1][col + 1] = vm.values[row][col];
                        }
                    }
                    var arround = [0, 1, 2]
                    for (let row = 0; row < vm.values.length; row++) {
                        for (let col = 0; col < vm.values[row].length; col++) {
                            var count = 0;
                            for (const rowElem of arround) {
                                for (const colElem of arround) {
                                    if (rowElem == 1 && colElem == 1) {
                                        continue;
                                    }
                                    if(arr[row + rowElem][col + colElem] == 1) {
                                        count++;
                                    }
                                }
                            }
                            if (vm.values[row][col] == 0 && count == 3) {
                                Vue.set(vm.values[row], col, 1);
                            }
                            if (vm.values[row][col] == 1 && (count == 2 || count == 3)) {
                                Vue.set(vm.values[row], col, 1);
                            }
                            if (vm.values[row][col] == 1 && count <= 1) {
                                Vue.set(vm.values[row], col, 0);
                            }
                            if (vm.values[row][col] == 1 && count >= 4) {
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
            Vue.set(this.values[2], 4, 1);
            Vue.set(this.values[3], 5, 1);
            Vue.set(this.values[4], 3, 1);
            Vue.set(this.values[4], 4, 1);
            Vue.set(this.values[4], 5, 1);
        }
    }
})
