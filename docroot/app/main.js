(function (exports) {

    var communityList = [
        {id: '1', label: 'Community 1'},
        {id: '2', label: 'Community 2'},
        {id: '3', label: 'Community 3'}
    ];

    Vue.component('yacpot-login-form', {
        methods: {
            doLogin: function (e) {
                var self = e.targetVM;
                e.preventDefault();
                yacpot.authenticate(
                    self.email,
                    self.password,
                    function () {
                        $(self.$el).hide();
                        $(self.$root.$.navigation.$el).show();
                        $(self.$root.$.browser.$el).show();
                    },
                    function () {
                        console.log('Error');
                    }
                )
            }
        }
    });

    Vue.component('yacpot-global-navigation', {
        methods: {
            openAdministration: function (e) {
                console.log('openAdministration not yet implemented!');
            },
            selectCommunity: function (e) {
                this.$dispatch('community-changed', e.targetVM.$data);
            }
        }
    });

    Vue.component('yacpot-community-browser', {
        methods: {
        }
    });

    var yacpotApplication = exports.yacpotApplication = new Vue({
        el: '#yacpot-application',
        data: {
            brandName: 'YACPOT',
            selectedCommunity: communityList[0],
            communities: communityList
        },
        computed: {
            userId: function () {
                return yacpot.userId;
            },
            userName: function () {
                return yacpot.userId;
            }
        },
        created: function () {
            document.title = this.brandName;
            this.$on('community-changed', function ($newCommunityModel) {
                this.selectedCommunity = $newCommunityModel;
            });
        }
    });

})(window);