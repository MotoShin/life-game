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
            },
            point: ""
        }
    },
    mounted() {
        var arr = new Array(65);
        for (let i = 0; i < 65; i++) {
            arr[i] = new Array(65).fill(0);
        }
        this.values = arr;
        Vue.set(this.values[0], 0, 0)
    },
    methods: {
        play() {
            var vm = this;
            (function loop() {
                vm.count++;
                // 実質sleep
                if (vm.count % 5 == 0) {
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
            var arr = new Array(this.values.length);
            for (let i = 0; i < this.values.length; i++) {
                arr[i] = new Array(this.values[i].length).fill(0);
            }
            this.values = arr;
            Vue.set(this.values[0], 0, 0)
        },
        random() {
            var arr = new Array(this.values.length);
            for (let i = 0; i < this.values.length; i++) {
                arr[i] = new Array(this.values[i].length).fill(0);
            }
            this.values = arr;

            for (let row = 0; row < this.values.length; row++) {
                for (let col = 0; col < this.values[row].length; col++) {
                    Vue.set(this.values[row], col, Math.floor(Math.random() * 2));
                }
            }
        },
        push(row, col) {
            if (!this.isPlayable) {
                if (this.values[row][col] == 0) {
                    Vue.set(this.values[row], col, 1);
                } else {
                    Vue.set(this.values[row], col, 0);
                }
            }
        },
        show() {
            this.point = "";
            for (let row = 0; row < this.values.length; row++) {
                for (let col = 0; col < this.values[row].length; col++) {
                    if (this.values[row][col] == 1) {
                        this.point += ("(row: " + row + ", col: " + col + "), ");
                    }
                }
            }
        },
        grinder() {
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
        spaceShip() {
            var arr = new Array(65);
            for (let i = 0; i < 65; i++) {
                arr[i] = new Array(65).fill(0);
            }
            this.values = arr;
            Vue.set(this.values[2], 2, 1);
            Vue.set(this.values[2], 5, 1);
            Vue.set(this.values[3], 6, 1);
            Vue.set(this.values[4], 2, 1);
            Vue.set(this.values[4], 6, 1);
            Vue.set(this.values[5], 3, 1);
            Vue.set(this.values[5], 4, 1);
            Vue.set(this.values[5], 5, 1);
            Vue.set(this.values[5], 6, 1);
        },
        grinderGun() {
            var arr = new Array(65);
            for (let i = 0; i < 65; i++) {
                arr[i] = new Array(65).fill(0);
            }
            this.values = arr;
            var p = [[2, 27], [3, 25], [3, 27], [4, 15], [4, 16], [4, 23], [4, 24],
                          [4, 37], [4, 38], [5, 14], [5, 18], [5, 23], [5, 24],
                          [5, 37], [5, 38], [6, 3], [6, 4], [6, 13], [6, 19],
                          [6, 23], [6, 24], [7, 3], [7, 4], [7, 13], [7, 17],
                          [7, 19], [7, 20], [7, 25], [7, 27], [8, 13], [8, 19],
                          [8, 27], [9, 14], [9, 18], [10, 15], [10, 16]];
            for (let n = 0; n < p.length; n++) {
                Vue.set(this.values[p[n][0]], p[n][1], 1);
            }
        },
        line() {
            var arr = new Array(65);
            for (let i = 0; i < 65; i++) {
                arr[i] = new Array(65).fill(0);
            }
            this.values = arr;
            for (let n = 13; n < 23; n++) {
                Vue.set(this.values[11], n, 1);
            }
        },
        queenBee() {
            var arr = new Array(65);
            for (let i = 0; i < 65; i++) {
                arr[i] = new Array(65).fill(0);
            }
            this.values = arr;
            var p = [[8,17],[9,16],[9,17],[10,15],[10,16],[10,21],[10,22],
            [11,5],[11,6],[11,14],[11,15],[11,16],[11,21],[11,21],[11,22],
            [11,25],[11,26],[12,5],[12,6],[12,15],[12,16],[12,21],[12,22],
            [12,25],[12,26],[13,16],[13,17],[14,17]];
            for (let n = 0; n < p.length; n++) {
                Vue.set(this.values[p[n][0]], p[n][1], 1);
            }
        }
    }
})
