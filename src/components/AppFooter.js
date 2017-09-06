import React, { Component } from 'react';
import { Image, StyleSheet } from 'react-native';
import { Footer, FooterTab, Icon, Button, Text } from 'native-base';
import { Actions } from 'react-native-router-flux';

export default class AppFooter extends Component {
    state = {
        activeTabName: 'contentfeed'
    };
    componentWillMount() {
        let { tabName } = this.props;
        if (tabName !== 'contentfeed') {
            this.setState({ activeTabName: tabName });
        }
    }

    tabAction(tab) {
        this.setState({ activeTabName: tab });
        if (tab === 'contentfeed') {
            Actions.contentfeed({ type: 'reset' });
        } else if (tab === 'noteapp') {
            Actions.noteapp({ type: 'reset' })
        }else if(tab === 'imageuploadapp'){
            Actions.imageuploadapp()
        }
    }

    render() {
        let { onLogout } = this.props;
        return (
            <Footer>
                <FooterTab>
                    <Button
                        active={(this.state.activeTabName === "contentfeed") ? true : false}
                        onPress={() => { this.tabAction('contentfeed') }}>
                        <Icon name="paper" />
                        <Text>Feed</Text>
                    </Button>
                    <Button
                        active={(this.state.activeTabName === "noteapp") ? true : false}
                        onPress={() => { this.tabAction('noteapp') }}>
                        <Icon name="md-clipboard" />
                        <Text>Note</Text>
                    </Button>
                    <Button
                        active={(this.state.activeTabName === "imageuploadapp") ? true : false}
                        onPress={() => { this.tabAction('imageuploadapp') }}>
                        <Icon name="md-camera" />
                        <Text>Upload</Text>
                    </Button>
                    <Button
                        active={(this.state.activeTabName === "logout") ? true : false}
                        onPress={onLogout}>
                        <Icon name="md-lock" />
                        <Text>Logout</Text>
                    </Button>
                </FooterTab>
            </Footer>
        );
    }
}