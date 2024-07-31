import React from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import SPACING from "../config/SPACING";
import COLORS from "../config/COLORS";

const TourDetailScreen = ({ route, navigation }) => {
  const { tour } = route.params;

  return (
    <>
      <ScrollView>
        <ImageBackground
          source={tour.image} 
          style={{
            width: "100%",
            height: 500,
          }}
        >
          <SafeAreaView>
            <View
              style={{
                paddingHorizontal: SPACING,
                justifyContent: "space-between",
                flexDirection: "row",
                height: "100%",
              }}
            >
              <View style={{ justifyContent: "space-between", paddingBottom: SPACING * 8 }}>
                <View>
                  {Array.isArray(tour.images) &&
                    tour.images.map((gallery, index) => (
                      <TouchableOpacity
                        style={{
                          width: SPACING * 6,
                          height: SPACING * 6,
                          padding: SPACING / 2,
                          borderRadius: SPACING,
                          marginBottom: SPACING,
                        }}
                        key={index}
                      >
                        <Image
                          source={gallery.image} 
                          style={{
                            width: "100%",
                            height: "100%",
                            borderRadius: SPACING,
                          }}
                        />
                      </TouchableOpacity>
                    ))}
                </View>
              </View>
            </View>
          </SafeAreaView>
        </ImageBackground>

        <View
          style={{
            backgroundColor: COLORS.white,
            padding: SPACING * 2,
            borderRadius: SPACING * 2,
            marginBottom: SPACING * 6, 
            marginHorizontal: SPACING * 1.6,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Text
              style={{
                fontSize: SPACING * 2,
                fontWeight: "bold",
                color: COLORS.dark,
              }}
            >
              {tour.title}
            </Text>

            <View
              style={{
                flexDirection: "row",
                alignItems: "flex-end",
              }}
            >
              <Text
                style={{
                  fontSize: SPACING * 2,
                  fontWeight: "bold",
                  color: COLORS.dark,
                }}
              >
                {tour.price}
              </Text>
              <Text>/person</Text>
            </View>
          </View>

          <View>
            <View
              style={{
                marginVertical: SPACING * 2,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  marginBottom: SPACING * 2,
                }}
              >
                <TouchableOpacity
                  style={{
                    paddingVertical: SPACING,
                    marginRight: SPACING * 2,
                  }}
                >
                  <Text
                    style={{
                      color: COLORS.primary,
                      fontWeight: "bold",
                      fontSize: SPACING * 2,
                    }}
                  >
                    Overview
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={{
                    paddingVertical: SPACING,
                    marginRight: SPACING * 2,
                  }}
                >
                  <Text>Review</Text>
                </TouchableOpacity>
              </View>

              <View
                style={{
                  marginBottom: SPACING * 2,
                  flexDirection: "row",
                }}
              >
                <View
                  style={{
                    shadowColor: COLORS.dark,
                    shadowOffset: { width: SPACING / 2, height: SPACING },
                    shadowRadius: SPACING / 2,
                    shadowOpacity: 0.2,
                    padding: SPACING / 2,
                    borderRadius: SPACING / 2,
                    marginRight: SPACING,
                  }}
                >
                  <Ionicons
                    name="time"
                    size={SPACING * 3}
                    color={COLORS.primary}
                  />
                </View>

                <View
                  style={{
                    marginRight: SPACING * 2,
                  }}
                >
                  <Text
                    style={{
                      fontSize: SPACING + 2,
                      marginBottom: SPACING / 2,
                      textTransform: "uppercase",
                    }}
                  >
                    Duration
                  </Text>
                  <Text
                    style={{
                      fontSize: SPACING * 1.6,
                      fontWeight: "700",
                    }}
                  >
                    {tour.duration}
                  </Text>
                </View>
              </View>

              <View
                style={{
                  marginBottom: SPACING * 2,
                  flexDirection: "row",
                }}
              >
                <View
                  style={{
                    shadowColor: COLORS.dark,
                    shadowOffset: { width: SPACING / 2, height: SPACING },
                    shadowRadius: SPACING / 2,
                    shadowOpacity: 0.1,
                    padding: SPACING / 2,
                    borderRadius: SPACING / 2,
                    marginRight: SPACING,
                  }}
                >
                  <Ionicons
                    name="star"
                    size={SPACING * 3}
                    color={COLORS.primary}
                  />
                </View>

                <View
                  style={{
                    marginRight: SPACING * 2,
                  }}
                >
                  <Text
                    style={{
                      fontSize: SPACING + 2,
                      marginBottom: SPACING / 2,
                      textTransform: "uppercase",
                    }}
                  >
                    Rating
                  </Text>
                  <Text
                    style={{
                      fontSize: SPACING * 1.6,
                      fontWeight: "700",
                    }}
                  >
                    {tour.rating} Out of 5 Stars
                  </Text>
                </View>
              </View>
            </View>
            <View>
              <Text style={{ color: COLORS.dark }}>{tour.description}</Text>
            </View>
          </View>
        </View>
      </ScrollView>
      <View style={{ position: "absolute", bottom: SPACING * 2, width: "100%" }}>
        <TouchableOpacity
          style={{
            backgroundColor: COLORS.primary,
            padding: SPACING * 1.5,
            marginHorizontal: SPACING * 1.6,
            borderRadius: SPACING * 2,
            flexDirection: "row",
            justifyContent: "center", // Centered the content
            alignItems: "center",
          }}
          onPress={() => navigation.navigate('BookingScreen', { tour })}
        >
          <Text
            style={{
              color: COLORS.white,
              fontSize: SPACING * 2,
              fontWeight: "bold",
              marginRight: SPACING,
            }}
          >
            Book Now
          </Text>
          <Ionicons
            name="arrow-forward"
            size={SPACING * 3}
            color={COLORS.white}
          />
        </TouchableOpacity>
      </View>
    </>
  );
};

export default TourDetailScreen;

const styles = StyleSheet.create({});
