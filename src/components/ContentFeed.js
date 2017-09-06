import React, { Component } from 'react';
import { View, Text, ListView, Image, TouchableOpacity, Linking } from 'react-native';
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Card, Thumbnail, CardItem } from 'native-base';

import LoadingViewComponent from './LoadingComponent';
import {signoutAsync} from '../helper';
import AppFooter from './AppFooter'

const apiKey = 'AIzaSyAFYk7Kahr_8n-mTCE29K-x5lv2kgrd1aA';
const channelID = 'UC5mJrJ6tg1WiGGWzoKK7ewQ';

class ContentFeed extends Component {
    componentWillMount() {
        this.getJsonFeed();
    }
    async getJsonFeed() {
        this.setState({ isLoading: true });
        try {
            const response = await fetch('https://www.googleapis.com/youtube/v3/search?key=' + apiKey + '&channelId=' + channelID + '&part=snippet,id&order=date&maxResults=20');

            const responseJson = await response.json();

            this.setState({ dataSource: this.state.dataSource.cloneWithRows(responseJson.items), isLoading: false });

        } catch (error) {
            alert(error.toString());
            this.setState({ isLoading: false });
        }
    }
    constructor(props) {
        super(props);
        const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        this.state = {
            dataSource: ds.cloneWithRows([]),
            isLoading: false
        };
    }
    renderRowCard(rowData) {
        let { title, description, publishedAt, thumbnails } = rowData.snippet;
        let { videoId } = rowData.id;
        let { high } = thumbnails;
        return (
            <Card >
                <CardItem>
                    <Left>
                        <Thumbnail source={{ uri: 'https://yt3.ggpht.com/-3rayVyHvRWI/AAAAAAAAAAI/AAAAAAAAAAA/B14_OGQpBvA/s88-c-k-no-mo-rj-c0xffffff/photo.jpg' }} />
                        <Body>
                            <Text style={{
                                fontWeight: 'bold',
                                fontSize: 16
                            }}>{title}</Text>
                            <Text note>{publishedAt}</Text>
                        </Body>
                    </Left>
                </CardItem>
                <CardItem cardBody>
                    <Body>
                        <TouchableOpacity style={{
                            alignSelf: 'stretch'
                        }}
                            onPress={() => Linking.openURL('https://www.youtube.com/watch?v=' + videoId)}
                        >
                            <Image source={{ uri: high.url }} style={{
                                resizeMode: 'cover',
                                alignSelf: 'stretch',
                                height: high.height - 155
                            }} />
                        </TouchableOpacity>
                    </Body>
                </CardItem>
                <CardItem content>
                    <Text>{description}</Text>
                </CardItem>
            </Card>
        )
    }
    render() {
        return (
            <Container>
                <Content>
                    <ListView
                        dataSource={this.state.dataSource}
                        renderRow={(rowData) => this.renderRowCard(rowData)}
                        enableEmptySections={true}
                    />
                    <LoadingViewComponent isLoading={this.state.isLoading} />
                </Content>
                <AppFooter onLogout={()=>signoutAsync(this)} tabName="contentfeed"/>
                <LoadingViewComponent isLoading={this.state.isLoading} />
            </Container>
        );
    }
}

export default ContentFeed;