import tensorflow as tf

# load h5 module
model = tf.keras.models.load_model('MobileNet_v1.h5')
tflite_converter = tf.lite.TFLiteConverter.from_keras_model(model)

# convert
tflite_model = tflite_converter.convert()
open("MobileNet_v1.tflite", "wb").write(tflite_model)
