import { useContext, useState } from "react";
import { StyleSheet, Button, Text, TextInput, View } from "react-native";
import { Picker } from "@react-native-picker/picker";
import Modal from "react-native-modal";
import Icon from "react-native-vector-icons/FontAwesome";
import { useForm, Controller } from "react-hook-form";

import { SearchPlaceContext } from "../../context/SearchPlaceProvider";

export default function SearchModalComponent(prop) {
  const { searchInfo, setSearchInfo } = useContext(SearchPlaceContext);
  const [modalDisplay, setModalDisplay] = useState(false);

  const searchCondition = prop.searchCondition;

  const { handleSubmit, formState, control, setValue } = useForm({
    mode: "onChange",
    defaultValues: searchInfo
      ? {
          storeType: searchInfo.storeType,
          location: searchInfo.location,
          startHour: searchInfo.startHour,
          endHour: searchInfo.endHour,
        }
      : {
          storeType: searchCondition.store_type[0].key,
          location: searchCondition.location[0].key,
        },
  });

  const timeValidateSetting = {
    min: {
      value: 0,
      message: "0以上の数を入力してください",
    },
    max: {
      value: 24,
      message: "24以下の数を入力してください",
    },
    pattern: {
      value: /[0-9]/,
      message: "数値を入力してください",
    },
  };

  const displayNumber = (inputNum) => {
    return inputNum ? parseInt(inputNum) : undefined;
  };

  const onSearchSubmit = (data) => {
    setSearchInfo({
      ...data,
      startHour: displayNumber(data.startHour),
      endHour: displayNumber(data.endHour),
    });
    setModalDisplay(false);
  };

  const onCancel = () => {
    if (searchInfo) {
      setValue("storeType", searchInfo.storeType);
      setValue("location", searchInfo.location);
      setValue("startHour", searchInfo.startHour);
      setValue("endHour", searchInfo.endHour);
    } else {
      setValue("storeType", searchCondition.store_type[0].key);
      setValue("location", searchCondition.location[0].key);
      setValue("startHour", undefined);
      setValue("endHour", undefined);
    }
    setModalDisplay(false);
  };

  return (
    <View>
      <Button
        title="検索条件"
        onPress={() => {
          setModalDisplay(true);
        }}
      />
      <Modal isVisible={modalDisplay}>
        <View style={styles.modalContainer}>
          <Icon
            name="window-close-o"
            style={styles.closeBox}
            onPress={onCancel}
            color={"white"}
            size={40}
          />
          <View style={styles.inputContainer}>
            <Controller
              name="storeType"
              control={control}
              render={({ field: { onChange, value } }) => (
                <Picker
                  selectedValue={value}
                  onValueChange={(itemValue) => onChange(itemValue)}
                  style={styles.selectInput}
                >
                  {searchCondition.store_type.map((s) => (
                    <Picker.Item label={s.value} value={s.key} />
                  ))}
                </Picker>
              )}
            />
            <Controller
              name="location"
              control={control}
              render={({ field: { onChange, value } }) => (
                <Picker
                  selectedValue={value}
                  onValueChange={(itemValue) => onChange(itemValue)}
                  style={styles.selectInput}
                >
                  {searchCondition.location.map((s) => (
                    <Picker.Item label={s.value} value={s.key} />
                  ))}
                </Picker>
              )}
            />
            <Controller
              name="startHour"
              control={control}
              rules={timeValidateSetting}
              render={({ field: { onChange, value } }) => (
                <TextInput
                  label="開店時刻（時）"
                  placeholder="開店時刻（時）"
                  style={styles.hourInput}
                  keyboardType="numeric"
                  onChangeText={(text) => onChange(text)}
                  value={value}
                />
              )}
            />
            {formState.errors.startHour && (
              <View style={styles.error}>
                <Text style={styles.errorText}>
                  {formState.errors.startHour.message}
                </Text>
              </View>
            )}
            <Controller
              name="endHour"
              control={control}
              rules={timeValidateSetting}
              render={({ field: { onChange, value } }) => (
                <TextInput
                  label="閉店時刻（時）"
                  placeholder="閉店時刻（時）"
                  style={styles.hourInput}
                  keyboardType="numeric"
                  onChangeText={(text) => onChange(text)}
                  value={value}
                />
              )}
            />
            {formState.errors.endHour && (
              <View style={styles.error}>
                <Text style={styles.errorText}>
                  {formState.errors.endHour.message}
                </Text>
              </View>
            )}
            <View style={styles.searchButton}>
              <Button
                title="検索"
                disabled={!formState.isValid}
                onPress={handleSubmit(onSearchSubmit)}
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    width: "100%",
  },
  inputContainer: {
    flex: 1,
    alignItems: "center",
  },
  closeBox: {
    height: 60,
    width: 60,
    cursor: "pointer",
    alignSelf: "flex-end",
  },
  selectInput: {
    width: 300,
    marginVertical: 10,
  },
  hourInput: {
    width: 100,
    marginVertical: 10,
    backgroundColor: "white",
  },
  searchButton: {
    marginVertical: 20,
    width: 250,
  },
  error: {
    backgroundColor: "white",
  },
  errorText: {
    color: "red",
  },
});
