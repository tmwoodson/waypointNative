'use strict';

var React = require('react-native');
var styles = require('./main.styles.js')
var FBLoginManager = require('NativeModules').FBLoginManager

var {
  TabBarIOS,
  NavigatorIOS,
  View,
} = React;

var Browse = require('../Browse/browse.index.js');
var Map = require('../Map/map.index.js');
var Create = require('../Create/create.index.js');
var Profile = require('../Profile/profile.index.js');
var CurrentQuest = require('../CurrentQuest/currentQuest.index.js');

// var baseUrl = 'https://waypointserver.herokuapp.com';

class Main extends React.Component {
  // Default view is 'browse'
  constructor (props) {
    console.log('props passed into main: ', props);
    // console.log('user passed into main: ', props.user);
    super(props);
    this.state = {
      selectedTab: props.selectedTab,
      user: props.user,
      currentQuest: props.currentQuest || {title: "currentQuest", waypoints: [{ latitude: 1.111111, longitude: 2.222222 }]},
      handleLogout: props.handleLogout,
      // baseUrl: 'http://127.0.0.1:3000'
    };
  } // end of constructor()

  handleLogout () {
    this.props.onLogout();
  }

  // - When a tab is clicked on the TabBar, the tab calls the corresponding function which will render that scene.
  render () {
    return (
      <TabBarIOS
        style={styles.tabBar}
        selectedTab={this.state.selectedTab}>

        <TabBarIOS.Item
          style={styles.description}
          selected={this.state.selectedTab === 'browse'}
          title="Browse"
          onPress={ ()=> {
            if (this.state.selectedTab === 'browse'){
              this.refs.BrowseRef.popToTop();
            } else {
              this.setState({
                selectedTab: 'browse'
              });
            }
          }}>
          {this.renderBrowseView()}
        </TabBarIOS.Item>

        <TabBarIOS.Item
          style={styles.description}
          selected={this.state.selectedTab === 'quest'}
          title="Quest"
          onPress={ ()=> {
            this.setState({
              selectedTab: 'quest'
            });
          }}>
          {this.renderQuestView()}
        </TabBarIOS.Item>


        <TabBarIOS.Item
          selected={this.state.selectedTab === 'profile'}
          title="Profile"
          onPress={ ()=> {
            if (this.state.selectedTab === 'profile') {
              this.refs.ProfileRef.popToTop();
            } else {
              this.setState({
                selectedTab: 'profile'
              });
            }
          }}>
          {this.renderProfileView()}
        </TabBarIOS.Item>

      </TabBarIOS>
    )
  } // end of render()

        // MOVING THIS ASIDE FOR NOW

        // <TabBarIOS.Item
        //   selected={this.state.selectedTab === 'create'}
        //   title="Create"
        //   onPress={ ()=> {
        //     if (this.state.selectedTab === 'create') {
        //       this.refs.CreateRef.popToTop();
        //     } else {
        //       this.setState({
        //         selectedTab: 'create'
        //       });
        //     }
        //   }}>
        //   {this.renderCreateView()}
        // </TabBarIOS.Item>



  // renders the Browse Quests list
  renderBrowseView(){
    console.log('rendering browse view');
    console.log('baseUrl: ', this.props.baseUrl);
    return (
      <NavigatorIOS
        style={styles.wrapper}
        ref="BrowseRef"
        initialRoute={{
          title: 'Browse Quests',
          backButtonTitle: ' ',
          component: Browse,
          passProps: { ref: this.refs, user: this.props.user, url: this.props.baseUrl + 'quests', baseUrl: this.props.baseUrl, type: 'browse' }
        }}/>
    )
  } // end of renderBrowseView()

  // // renders the Create view
  // renderCreateView(){
  //   return (
  //     <NavigatorIOS
  //       style={styles.wrapper}
  //       ref="CreateRef"
  //       initialRoute={{
  //         title: 'Create Quest',
  //         backButtonTitle: ' ',
  //         component: Create,
  //         passProps: { test: "HEYA! I'M THE CREATE VIEW!! "}
  //       }}/>
  //   )
  // } // end of renderCreateView()

  renderQuestView() {
    return (
      <View style={styles.wrapper}>
        <CurrentQuest
         quest={this.state.currentQuest}>
        </CurrentQuest>
      </View>
    )
  }

  // renders the Profile view
  renderProfileView(){
    return (
      <NavigatorIOS
        style={styles.wrapper}
        ref="ProfileRef"
        initialRoute={{
          title: 'Profile',
          backButtonTitle: ' ',
          component: Profile,
          passProps: { user: this.props.user, onLogout: this.props.onLogout, ref: this.refs, url: this.props.baseUrl }
        }}/>
    )
  } // end of renderProfileView()

}; // end of Main class

module.exports = Main;
