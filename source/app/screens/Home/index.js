import React, { Component } from "react";
import {
  View,
  ScrollView,
  Animated,
  TouchableOpacity,
  FlatList
} from "react-native";
import {
  Image,
  Text,
  Icon,
  Card,
  SafeAreaView,
  Tag,
  CardList
} from "@components";
import { BaseStyle, BaseColor, Images} from "@config";
import * as Utils from "@utils";
import styles from "./styles";
import Swiper from "react-native-swiper";
import {  
  HomePopularData,
  
} from "@data";

import { SlideShowAction} from "@actions";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as  API  from '../../config/api';


class Home extends Component {
  constructor(props) {
    super(props);

    // Temp data define
    this.state = {
      banner: [],
      location: [
        { id: "1", name: "Delux Room" },
        { id: "2", name: "Tripple Room" },
        { id: "3", name: "Single Room" },
        { id: "4", name: "King Room" },
        { id: "5", name: "King Room" }
      ],
      popular: HomePopularData,      
      heightHeader: Utils.heightHeader()
    };
    this._deltaY = new Animated.Value(0);
       
    this.props.actions.basic("", response => {            
      console.log("slideshow--- started");      
      if ( response.success ) {
        this.setState(
          { banner: response.data.slideshow, services:response.data.categories, list:response.data.res,  popular:response.data.pop}  
        );                
        console.log(response.data.slideshow);

      } else {
        this.setState({
          loading: false
        });
      }
    });

  }

  /**
   * @description Show location on form searching
   * @author Passion UI <passionui.com>
   * @date 2019-09-01
   * @returns
   */
  renderLocation() {
    const { navigation } = this.props;
    return this.state.location.map((item, i) => {
      return (
        <Tag
          gray
          key={item.id}
          onPress={() => {}}
          style={{
            backgroundColor: BaseColor.fieldColor,
            marginTop: 5
          }}
        >
          <Text caption2>{item.name}</Text>
        </Tag>
      );
    });
  }


  render() {
    const { navigation } = this.props;
    const { banner, services, popular, list, heightHeader } = this.state;
    const heightImageBanner = Utils.scaleWithPixel(225);
    const marginTopBanner = heightImageBanner - heightHeader + 10;
    return (
      <View style={{ flex: 1, backgroundColor: "white" }}>
        <Animated.View
          style={[
            styles.imageBackground,
            {
              height: this._deltaY.interpolate({
                inputRange: [
                  0,
                  Utils.scaleWithPixel(150),
                  Utils.scaleWithPixel(150)
                ],
                outputRange: [heightImageBanner, heightHeader, 0]
              })
            }
          ]}
        >
          <Swiper
            dotStyle={{
              backgroundColor: BaseColor.textSecondaryColor
            }}
            activeDotColor={BaseColor.primaryColor}
            paginationStyle={styles.contentPage}
            removeClippedSubviews={false}
            autoplay={true}
            autoplayTimeout={2}
          >
            {banner.map((item, index) => {
              return (                
                <Image key={item.id} source={{uri:API.URL + item.image}} style={{ flex: 1 }} />  
              );
            })}
          </Swiper>
        </Animated.View>


        <SafeAreaView style={{ flex: 1 }} forceInset={{ top: "always" }}>
          <ScrollView
            onScroll={Animated.event([
              {
                nativeEvent: {
                  contentOffset: { y: this._deltaY }
                }
              }
            ])}
            onContentSizeChange={() => {
              this.setState({
                heightHeader: Utils.heightHeader()
              });
            }}
            scrollEventThrottle={8}
          >


            <View style={[styles.searchForm, { marginTop: marginTopBanner }]}>
              <TouchableOpacity
                onPress={() => navigation.navigate("SearchHistory")}
                activeOpacity={0.9}
              >
                <View
                  style={[
                    BaseStyle.textInput,
                    {
                      flexDirection: "row",
                      alignItems: "center"
                    }
                  ]}
                >
                  <Text body1 grayColor style={{ flex: 1 }}>
                    Search Location                   
                  </Text>
                
                  <View style={styles.lineForm} />
                  <Icon
                    name="location-arrow"
                    size={18}
                    color={BaseColor.lightPrimaryColor}
                    solid
                  />
                </View>
              </TouchableOpacity>
              
              {/* <View style={styles.contentLocation}>
                {this.renderLocation()}
              </View> */}

              
            </View>
            {/* services */}
            <FlatList
              contentContainerStyle={{ padding: 20 }}
              data={services}
              numColumns={4}
              keyExtractor={(item, index) => item.id}
              renderItem={({ item }) => {
                return (
                  <TouchableOpacity
                    style={styles.serviceItem}
                    onPress={() => navigation.navigate("Place")}
                  >
                    <View
                      style={[
                        styles.serviceCircleIcon,
                        { backgroundColor: BaseColor.textSecondaryColor }
                      ]}
                    >
                      <Image source={{uri:API.URL + item.image}}  style={{ width: 25, height:25 }} />


                    </View>
                    <Text
                      footnote
                      style={{
                        marginTop: 5,
                        marginBottom: 20,                        
                        textAlign:'center'                        
                      }}
                    >
                      {item.name}
                    </Text>
                  </TouchableOpacity>
                );
              }}
            />

            {/* Hiking */}
            <View style={styles.contentPopular}>
              <Text title3 semibold>
                Restaurantes populares
              </Text>
              <Text body2 grayColor>
                Lugares favoritos, recommendados
              </Text>
            </View>
            <FlatList
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              data={popular}
              keyExtractor={(item, index) => item.id}
              renderItem={({ item, index }) => (
                <Card
                  style={[
                    styles.popularItem,
                    index == 0 ? { marginHorizontal: 20 } : { marginRight: 20 }
                  ]}
                  image={  {uri:API.URL + item.img} }
                  onPress={() => navigation.navigate("PlaceDetail")}
                >
                  <Text headline whiteColor semibold>
                    {/* {item.title} */}
                    {item.title}
                  </Text>
                </Card>
              )}
            />
            {/* Promotion */}
            <View
              style={{
                padding: 20
              }}
            >
              <Text title3 semibold>
                Recent Location
              </Text>
              <Text body2 grayColor>
                What’s the Worst That Could Happen
              </Text>
              <FlatList
                style={{ marginTop: 20 }}
                data={list}
                keyExtractor={(item, index) => item.id}
                renderItem={({ item, index }) => (
                  <CardList
                    image={{uri:API.URL + item.img}}
                    title={item.title}
                    subtitle={item.phone}
                    rate={item.rate}
                    style={{ marginBottom: 20 }}
                    onPress={() => navigation.navigate("PlaceDetail")}
                  />
                )}
              />
            </View>
          </ScrollView>
        </SafeAreaView>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
      actions: bindActionCreators(SlideShowAction, dispatch)    
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);


