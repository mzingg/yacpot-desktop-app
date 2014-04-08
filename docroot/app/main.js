(function(exports) {

    var communityList = [
        {id: '1', label: 'Community 1'},
        {id: '2', label: 'Community 2'},
        {id: '3', label: 'Community 3'}
    ];

    Vue.component('yacpot-global-navigation', {
        methods: {
            openAdministration: function(e) {
                console.log('openAdministration not yet implemented!');
            },
            selectCommunity: function(e) {
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
            user: {
                id: 'mzingg@gmx.net',
                name: 'Markus Zingg'
            },
            selectedCommunity: communityList[0],
            communities: communityList
        },
        created: function() {
            document.title = this.brandName;
            this.$on('community-changed', function($newCommunityModel) {
               this.selectedCommunity = $newCommunityModel;
            });
        }
    });

})(window);