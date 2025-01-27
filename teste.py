from langchain.chat_models import ChatOpenAI
from langchain.prompts import ChatPromptTemplate
from langchain.chains import LLMChain



def chain_create_deck_from_input(user_input):
    prompt = ChatPromptTemplate.from_template(
        "Generate data for flashcard deck by using the input at the end.\n"
        "Your duty is to analyze input and come up with some data. Randomly generate it somehow.\n"
        "You must generate a value pairs for front and back side of each card in a deck.\n"
        "Try to be creative and concise\n"
        "Don't use more than 6-8 words on either side. And generate 15 cards on average."


        "User might not tell every detail needed to generate data."
        "Even then try to come up to a point and generate a flashcard deck data.\n"



        "format:\n"
        "only return a json object to create the dataframe mentioned above.\n"
        "front and back values are strings.\n"
        "deck name: lowercase and use underscores.\n"        

        "Generate a list of dictionaries with each dictionary representing a flashcard. Each dictionary should have two keys: 'front' and 'back', representing the front and back of a flashcard.\n"
        "Format example: [{'front': 'Example Front 1', 'back': 'Example Back 1'}, ...]\n"


        "\n\n\nuser input: {user_input}"
    )


    llm = ChatOpenAI(temperature=0.9)

    chain = LLMChain(llm=llm, prompt=prompt, verbose=True)

    response = chain.run({'user_input': user_input})

    return response